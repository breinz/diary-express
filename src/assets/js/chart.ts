declare let data: any;

import $ from "jquery";
import Chartist from "chartist";

class Chart {
    public init() {
        this.reportMonthCategories();
    }

    private reportMonthCategories() {
        if ($("#chart-report-month-categories").length == 0) return;

        /*let data = {
            // A labels array that can contain any sort of values
            labels: ["Mon", 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [5, 2, 4, 2, 5]
        };*/

        let options = {
            /*width: 300,
            height: 300,*/
            height: "90%"
            /*labelInterpolationFnc: function (value: any) {
                return value[0]
            }*/
        }

        const chart = new Chartist.Pie('#chart-report-month-categories', data, options);

        if (data.colors) {

            let i = 0;

            chart.on("draw", function (context: any) {
                if (i > data.colors.length - 1) i = 0;
                if (context.type == "slice") {
                    context.element.attr({
                        style: `fill: ${data.colors[i++]}`
                    });
                }
            });
        }
    }
}

const chart = new Chart();
export default chart;