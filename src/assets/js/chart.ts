import $ from "jquery";
import Chartist from "chartist";

class Chart {
    public init() {
        if ($(".ct-chart").length == 0) return;

        let data = {
            // A labels array that can contain any sort of values
            labels: ["Mon", 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [5, 2, 4, 2, 5]
        };

        let options = {
            width: 300,
            height: 300,
            /*labelInterpolationFnc: function (value: any) {
                return value[0]
            }*/
        }

        new Chartist.Pie('.ct-chart', data, options);
    }
}

const chart = new Chart();
export default chart;