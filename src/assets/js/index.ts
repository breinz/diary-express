import $ from "jquery";

import sameWidth from "./sameWidth";
import table from "./table";
import link from "./link";
import expenseCategory from "./expenseCategory";
import chart from "./chart";
import toggle from "./toggle";

$(document).ready(function () {

    sameWidth.init();
    table.init();
    link.init();
    expenseCategory.init();
    chart.init();
    toggle.init();

    (<any>window).jQuery = $;
    require("bootstrap-toggle");
});