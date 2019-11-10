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
var ExpenseCategoryModel_1 = __importDefault(require("../model/ExpenseCategoryModel"));
var config_1 = __importDefault(require("../config"));
var ExpenseReportMiddleware = (function () {
    function ExpenseReportMiddleware() {
    }
    ExpenseReportMiddleware.prototype.getMonth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, total, categories, reports;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expenseReportMiddleware.req = req;
                        return [4, Promise.all([
                                expenseReportMiddleware.getTotal(),
                                expenseReportMiddleware.getCategories(),
                                expenseReportMiddleware.getReport()
                            ])];
                    case 1:
                        _a = _b.sent(), total = _a[0], categories = _a[1], reports = _a[2];
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
    ExpenseReportMiddleware.prototype.getYear = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, total, categories, reports;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expenseReportMiddleware.req = req;
                        return [4, Promise.all([
                                expenseReportMiddleware.getTotal(),
                                expenseReportMiddleware.getCategories(),
                                expenseReportMiddleware.getReport()
                            ])];
                    case 1:
                        _a = _b.sent(), total = _a[0], categories = _a[1], reports = _a[2];
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
    ExpenseReportMiddleware.prototype.getTotal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var total_query, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ExpenseModel_1.default.aggregate([
                            {
                                $match: {
                                    date: {
                                        $gte: this.req.bop,
                                        $lt: this.req.eop
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
                        total_query = _a.sent();
                        total = 0;
                        if (total_query[0]) {
                            total = total_query[0].total;
                        }
                        return [2, total];
                }
            });
        });
    };
    ExpenseReportMiddleware.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ExpenseModel_1.default.aggregate([
                            {
                                $match: {
                                    date: {
                                        $gte: this.req.bop,
                                        $lte: this.req.eop
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
    ExpenseReportMiddleware.prototype.getReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var daysIn, d, now, start, diff, oneDay, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.req.params.year) {
                            if (this.req.params.month) {
                                d = new Date();
                                d.setDate(1);
                                d.setHours(0, 0, 0, 0);
                                if (d.getTime() == this.req.bop.getTime()) {
                                    daysIn = new Date().getDate();
                                }
                                else {
                                    d = this.req.eop;
                                    d.setDate(d.getDate() - 1);
                                    daysIn = d.getDate();
                                }
                            }
                            else {
                                now = new Date();
                                start = new Date(now.getFullYear(), 0, 0);
                                diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                                oneDay = 1000 * 60 * 60 * 24;
                                daysIn = Math.floor(diff / oneDay);
                            }
                        }
                        else {
                            daysIn = new Date().getDate();
                        }
                        if (!(config_1.default.MONGO_VERSION >= 4)) return [3, 2];
                        return [4, ExpenseCategoryModel_1.default.aggregate([
                                {
                                    $match: {
                                        "report.active": true,
                                        "user": this.req.current_user._id
                                    }
                                }, {
                                    $lookup: {
                                        from: "expenses",
                                        let: {
                                            expense: "$_id",
                                            date: "$date"
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$category", "$$expense"]
                                                            },
                                                            {
                                                                $gte: ["$date", this.req.bop]
                                                            },
                                                            {
                                                                $lte: ["$date", this.req.eop]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ],
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
                        return [3, 4];
                    case 2: return [4, ExpenseCategoryModel_1.default.aggregate([{
                                $match: {
                                    "report.active": true,
                                    user: this.req.current_user._id
                                }
                            }, {
                                $lookup: {
                                    from: 'expenses',
                                    localField: '_id',
                                    foreignField: 'category',
                                    as: 'expenses'
                                }
                            }, {
                                $project: {
                                    _id: "$_id",
                                    expenses: {
                                        $filter: {
                                            input: "$expenses",
                                            as: "expense",
                                            cond: {
                                                $and: [
                                                    {
                                                        $gte: [
                                                            "$$expense.date",
                                                            this.req.bop
                                                        ]
                                                    },
                                                    {
                                                        $lte: [
                                                            "$$expense.date",
                                                            this.req.eop
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    icon: 1,
                                    color: 1,
                                    report: "$report"
                                }
                            }, {
                                $project: {
                                    icon: 1, color: 1,
                                    report: {
                                        per: 1,
                                        value: {
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
                            }
                        ])];
                    case 3:
                        report = _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log(JSON.stringify(report));
                        return [2, report];
                }
            });
        });
    };
    return ExpenseReportMiddleware;
}());
var expenseReportMiddleware = new ExpenseReportMiddleware();
exports.default = expenseReportMiddleware;
