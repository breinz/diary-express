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
var expenseCategoryMiddleware_1 = __importDefault(require("./expenseCategoryMiddleware"));
var ExpenseValidator_1 = __importDefault(require("../validator/ExpenseValidator"));
var ExpenseModel_1 = __importDefault(require("../model/ExpenseModel"));
var Util_1 = __importDefault(require("../helper/Util"));
var ExpenseCategoryModel_1 = __importDefault(require("../model/ExpenseCategoryModel"));
var ExpenseMiddleware = (function () {
    function ExpenseMiddleware() {
    }
    ExpenseMiddleware.prototype.getExpense = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ok, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ok = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req;
                        return [4, ExpenseModel_1.default.findById(req.params.id)];
                    case 2:
                        _a.expense = (_b.sent());
                        return [3, 4];
                    case 3:
                        error_1 = _b.sent();
                        ok = false;
                        return [3, 4];
                    case 4:
                        if (!req.expense || !ok) {
                            req.flash("error", req.t("expense.flash.error.not_found"));
                            res.redirect("/expense");
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getExpensePopulated = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ok, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ok = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req;
                        return [4, ExpenseModel_1.default.findById(req.params.id).populate("category")];
                    case 2:
                        _a.expense = (_b.sent());
                        return [3, 4];
                    case 3:
                        error_2 = _b.sent();
                        ok = false;
                        return [3, 4];
                    case 4:
                        if (!req.expense || !ok) {
                            req.flash("error", req.t("expense.flash.error.not_found"));
                            return [2, res.redirect("/expense")];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getExpenses = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bop, eop, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = expenseMiddleware.getPeriod(req), bop = _a[0], eop = _a[1];
                        _b = req;
                        return [4, ExpenseModel_1.default.find({ date: { $gte: bop, $lte: eop } }).sort("-date -amount").populate("category")];
                    case 1:
                        _b.expenses = (_c.sent());
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bop, eop, _b, total, categories, reports;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = expenseMiddleware.getPeriod(req), bop = _a[0], eop = _a[1];
                        return [4, Promise.all([
                                expenseMiddleware.getReport_total(bop, eop),
                                expenseMiddleware.getReport_categories(bop, eop),
                                expenseMiddleware.getReport_report(req.current_user, bop, eop)
                            ])];
                    case 1:
                        _b = _c.sent(), total = _b[0], categories = _b[1], reports = _b[2];
                        req.expenseReport = {
                            total: total,
                            categories: categories,
                            reports: reports
                        };
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.validNew = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new ExpenseValidator_1.default(req.body);
                        if (!!validator.validNew()) return [3, 2];
                        return [4, expenseCategoryMiddleware_1.default.getCategories(req, res)];
                    case 1:
                        _a.sent();
                        return [2, res.render("expense/new", {
                                expense: req.body,
                                errors: validator.errors,
                                categories: req.expenseCategories
                            })];
                    case 2:
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.validEdit = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new ExpenseValidator_1.default(req.body);
                        if (!!validator.validEdit()) return [3, 2];
                        return [4, expenseCategoryMiddleware_1.default.getCategories(req, res)];
                    case 1:
                        _a.sent();
                        return [2, res.render("expense/edit", {
                                expense: req.body,
                                errors: validator.errors,
                                categories: req.expenseCategories
                            })];
                    case 2:
                        next();
                        return [2];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getPeriod = function (req) {
        var bop, eop;
        if (req.params.year && req.params.month) {
            bop = new Date(parseInt(req.params.year), parseInt(req.params.month) - 1, 1);
            eop = new Date(parseInt(req.params.year), parseInt(req.params.month), 1);
        }
        else {
            bop = req.util.bom();
            eop = req.util.bonm();
        }
        return [bop, eop];
    };
    ExpenseMiddleware.prototype.getReport_total = function (bop, eop) {
        return __awaiter(this, void 0, void 0, function () {
            var util, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util = new Util_1.default();
                        return [4, ExpenseModel_1.default.aggregate([
                                {
                                    $match: {
                                        date: {
                                            $gte: bop,
                                            $lte: eop
                                        }
                                    }
                                }, {
                                    $group: {
                                        _id: null,
                                        total: {
                                            $sum: "$amount"
                                        }
                                    }
                                }
                            ])];
                    case 1:
                        total = _a.sent();
                        if (total[0]) {
                            return [2, total[0].total];
                        }
                        return [2, 0];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getReport_categories = function (bop, eop) {
        return __awaiter(this, void 0, void 0, function () {
            var util, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util = new Util_1.default();
                        return [4, ExpenseModel_1.default.aggregate([
                                {
                                    $match: {
                                        date: {
                                            $gte: bop,
                                            $lte: eop
                                        }
                                    }
                                }, {
                                    $group: {
                                        _id: "$category",
                                        total: {
                                            $sum: "$amount"
                                        },
                                        category: {
                                            $first: "$category"
                                        }
                                    }
                                }, {
                                    $lookup: {
                                        from: "expensecategories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "category"
                                    }
                                }, {
                                    $unwind: {
                                        path: "$category",
                                        preserveNullAndEmptyArrays: true
                                    }
                                }, {
                                    $sort: {
                                        total: -1
                                    }
                                }
                            ])];
                    case 1:
                        report = _a.sent();
                        return [2, report];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getReport_report = function (user, bop, eop) {
        return __awaiter(this, void 0, void 0, function () {
            var daysIn, d, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d = new Date();
                        d.setDate(1);
                        d.setHours(0, 0, 0, 0);
                        if (d.getTime() == bop.getTime()) {
                            daysIn = new Date().getDate();
                        }
                        else {
                            d = eop;
                            d.setDate(d.getDate() - 1);
                            daysIn = d.getDate();
                        }
                        return [4, ExpenseCategoryModel_1.default.aggregate([
                                {
                                    $match: {
                                        "report.active": true,
                                        "user": user._id
                                    }
                                }, {
                                    $lookup: {
                                        from: "expenses",
                                        let: {
                                            expense: "$_id",
                                            date: "$date"
                                        },
                                        pipeline: [{
                                                $match: {
                                                    $expr: {
                                                        $and: [{
                                                                $eq: ["$category", "$$expense"]
                                                            },
                                                            {
                                                                $gte: ["$date", bop]
                                                            },
                                                            {
                                                                $lte: ["$date", eop]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }],
                                        as: 'expenses'
                                    }
                                }, {
                                    $addFields: {
                                        "report.value": {
                                            $divide: [{
                                                    $sum: "$expenses.amount"
                                                }, {
                                                    $multiply: [
                                                        "$report.times",
                                                        {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ["$report.period", "day"]
                                                                },
                                                                then: daysIn,
                                                                else: 20
                                                            }
                                                        }
                                                    ]
                                                }]
                                        }
                                    }
                                }
                            ])];
                    case 1:
                        report = _a.sent();
                        return [2, report];
                }
            });
        });
    };
    ExpenseMiddleware.prototype.getMonth = function (req, res, next) {
        if (req.params.month && req.params.year) {
            if (parseInt(req.params.month) <= 0) {
                return res.redirect("/expense/" + (parseInt(req.params.year) - 1) + "-12");
            }
            if (parseInt(req.params.month) >= 13) {
                return res.redirect("/expense/" + (parseInt(req.params.year) + 1) + "-1");
            }
        }
        next();
    };
    return ExpenseMiddleware;
}());
var expenseMiddleware = new ExpenseMiddleware();
exports.default = expenseMiddleware;
