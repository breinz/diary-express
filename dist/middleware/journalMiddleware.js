"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExpenseModel_1 = __importDefault(require("../model/ExpenseModel"));
var PeopleModel_1 = __importDefault(require("../model/PeopleModel"));
var EventModel_1 = __importDefault(require("../model/EventModel"));
var JournalMiddleware = (function () {
    function JournalMiddleware() {
    }
    JournalMiddleware.prototype.validMonth = function (req, res, next) {
        if (req.params.month && req.params.year) {
            var month = parseInt(req.params.month);
            var year = parseInt(req.params.year);
            if (month <= 0) {
                return res.redirect("/journal/" + (year - 1) + "-12");
            }
            if (month >= 13) {
                return res.redirect("/journal/" + (year + 1) + "-1");
            }
        }
        next();
    };
    JournalMiddleware.prototype.getElements = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var expenses, people, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ExpenseModel_1.default.aggregate([
                            {
                                $match: {
                                    user: req.current_user._id,
                                    date: {
                                        $gte: req.bop,
                                        $lt: req.eop
                                    }
                                }
                            }, {
                                $lookup: {
                                    from: 'expensecategories',
                                    localField: 'category',
                                    foreignField: '_id',
                                    as: 'category'
                                }
                            },
                            {
                                $group: {
                                    _id: "$date",
                                    amount: {
                                        $sum: "$amount"
                                    }
                                }
                            }, {
                                $project: {
                                    amount: 1,
                                    date: "$_id"
                                }
                            }
                        ])];
                    case 1:
                        expenses = _a.sent();
                        return [4, PeopleModel_1.default.aggregate([
                                {
                                    $match: {
                                        user: req.current_user._id,
                                        met_at: {
                                            $gte: req.bop,
                                            $lt: req.eop
                                        }
                                    }
                                }, {
                                    $group: {
                                        _id: "$met_at",
                                        firstName: {
                                            $addToSet: "$firstName"
                                        }
                                    }
                                }, {
                                    $project: {
                                        firstName: 1,
                                        date: "$_id"
                                    }
                                }
                            ])];
                    case 2:
                        people = _a.sent();
                        return [4, EventModel_1.default.aggregate([
                                {
                                    $match: {
                                        user: req.current_user._id,
                                        date: {
                                            $gte: req.bop,
                                            $lt: req.eop
                                        },
                                        deleted: false
                                    }
                                }, {
                                    $group: {
                                        _id: "$date",
                                        categories: {
                                            $push: "$category"
                                        }
                                    }
                                },
                                {
                                    $unwind: {
                                        path: "$categories",
                                        preserveNullAndEmptyArrays: true
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'eventcategories',
                                        localField: 'categories',
                                        foreignField: '_id',
                                        as: 'categories'
                                    }
                                }, {
                                    $unwind: {
                                        path: "$categories",
                                        preserveNullAndEmptyArrays: true
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$_id",
                                        categories: {
                                            $push: "$categories"
                                        },
                                        total: {
                                            $sum: 1
                                        }
                                    }
                                }, {
                                    $project: {
                                        categories: 1,
                                        total: 1,
                                        date: "$_id"
                                    }
                                }
                            ])];
                    case 3:
                        events = _a.sent();
                        req.expenses = expenses;
                        req.peoples = people;
                        req.events = events;
                        res.locals.journalData = {
                            expenses: expenses,
                            people: people,
                            events: events
                        };
                        res.locals.month = req.params.month;
                        res.locals.year = req.params.year;
                        res.locals.day = req.params.day;
                        next();
                        return [2];
                }
            });
        });
    };
    JournalMiddleware.prototype.getDayElements = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, events, expenses, peoples;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, Promise.all([
                            EventModel_1.default.find({ user: req.current_user, date: req.bop, deleted: false }).populate("category"),
                            ExpenseModel_1.default.find({ user: req.current_user, date: req.bop }).populate("category").sort("-amount"),
                            PeopleModel_1.default.find({ user: req.current_user, met_at: req.bop, deleted: false }).populate("from")
                        ])];
                    case 1:
                        _a = _b.sent(), events = _a[0], expenses = _a[1], peoples = _a[2];
                        req.events = events;
                        req.expenses = expenses;
                        req.peoples = peoples;
                        res.locals.journalData = {
                            expenses: expenses,
                            peoples: peoples,
                            events: events
                        };
                        res.locals.month = req.params.month;
                        res.locals.year = req.params.year;
                        res.locals.day = req.params.day;
                        next();
                        return [2];
                }
            });
        });
    };
    return JournalMiddleware;
}());
var journalMiddleware = new JournalMiddleware();
exports.default = journalMiddleware;
