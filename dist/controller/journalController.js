"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JournalController = (function () {
    function JournalController() {
    }
    JournalController.prototype.getIndex = function (req, res, next) {
        res.render("journal/index");
    };
    return JournalController;
}());
var journalController = new JournalController();
exports.default = journalController;
