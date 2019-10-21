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
var path_1 = __importDefault(require("path"));
var util_1 = __importDefault(require("util"));
var sprintf_js_1 = __importDefault(require("sprintf-js"));
var fs_1 = __importDefault(require("fs"));
var readFile = util_1.default.promisify(fs_1.default.readFile);
var T = (function () {
    function T(lang) {
        this.lang = lang;
    }
    T.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all([
                            this.load_data(),
                            this.load_default_data()
                        ])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    T.prototype.t = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._t(str, args, this.data);
    };
    T.prototype.p = function (str, count) {
        return this._p(str, count, this.data);
    };
    T.prototype.default_t = function (str, args) {
        return this._t(str, args, this.default_data);
    };
    T.prototype.default_p = function (str, count) {
        return this._p(str, count, this.default_data);
    };
    T.prototype.load_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, readFile(path_1.default.join(__dirname, "lang", this.lang + ".json"))];
                    case 1:
                        data = _a.sent();
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3:
                        this.data = JSON.parse(data.toString());
                        return [2];
                }
            });
        });
    };
    T.prototype.load_default_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var default_data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, readFile(path_1.default.join(__dirname, "lang", "en.json"))];
                    case 1:
                        default_data = _a.sent();
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3:
                        this.default_data = JSON.parse(default_data.toString());
                        return [2];
                }
            });
        });
    };
    T.prototype.writeMissing = function (str, params, pluralisation) {
        if (pluralisation === void 0) { pluralisation = false; }
        var ar = str.split(".");
        if (!str || str == "undefined")
            return;
        if (ar[ar.length - 1] == "undefined")
            return;
        var result = this.default_data;
        ar.forEach(function (step, index) {
            if (result[step]) {
                result = result[step];
            }
            else {
                if (index == ar.length - 1) {
                    var value = "*" + step[0].toUpperCase() + step.substr(1);
                    if (pluralisation) {
                        result[step] = {
                            none: value,
                            one: value,
                            many: value
                        };
                    }
                    else {
                        result[step] = value;
                    }
                }
                else {
                    result[step] = {};
                    result = result[step];
                }
            }
        });
        fs_1.default.writeFile(path_1.default.join(__dirname, "lang", "en.json"), JSON.stringify(this.default_data, null, 4), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("default lang file updated with %s", str);
        });
        return "*" + ar[ar.length - 1][0].toUpperCase() + ar[ar.length - 1].substr(1);
    };
    T.prototype.writeMissingP = function (str, count) {
        return this.writeMissing(str, null, true);
    };
    T.prototype._t = function (str, args, dataset) {
        var fallback = dataset == this.data ? this.default_t.bind(this) : this.writeMissing.bind(this);
        var ar = str.split(".");
        try {
            ar.forEach(function (step) {
                dataset = dataset[step];
            });
        }
        catch (error) {
            return fallback(str, args);
        }
        if (!dataset || dataset.length == 0) {
            return fallback(str, args);
        }
        return sprintf_js_1.default.vsprintf(dataset, args);
    };
    T.prototype._p = function (str, count, dataset) {
        var fallback = dataset == this.data ? this.default_p.bind(this) : this.writeMissingP.bind(this);
        var ar = str.split(".");
        try {
            ar.forEach(function (step) {
                dataset = dataset[step];
            });
        }
        catch (error) {
            return fallback(str, count);
        }
        if (!dataset || dataset.length == 0) {
            return fallback(str, count);
        }
        dataset = count == 0 ? dataset.none : count == 1 ? dataset.one : dataset.many;
        return dataset;
    };
    return T;
}());
exports.default = T;
