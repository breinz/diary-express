import $ from "jquery";

import sameWidth from "./sameWidth";
import table from "./table";
import link from "./link";
import expenseCategory from "./expenseCategory";
import chart from "./chart";

$(document).ready(function () {

    sameWidth.init();
    table.init();
    link.init();
    expenseCategory.init();
    chart.init();
});