import $ from "jquery";

class Form {
    public init() {
        this.step();
    }

    private step() {
        $("[data-form-step]").click(function (e) {

            const form = $(this).parents("form");

            const step_input = $('<input type="text"/>');
            step_input.attr("name", "step");
            step_input.attr("value", $(this).data("form-step"));
            form.append(step_input);

            const stepName_input = $('<input type="text"/>');
            stepName_input.attr("name", "stepName");
            stepName_input.attr("value", $(this).data("form-step-name"));
            form.append(stepName_input);

            form.submit();

            e.preventDefault();
        });
    }
}

const form = new Form();
export default form;