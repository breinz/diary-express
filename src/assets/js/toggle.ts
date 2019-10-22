import $ from "jquery";

class Toggle {
    public init() {
        $("[data-toggle-reveal]").change(function () {
            const targets = $($(this).attr("data-toggle-reveal"))
            if ($(this).prop("checked")) {
                targets.show();
            } else {
                targets.hide();
            }
        }).each(function () {
            const targets = $($(this).attr("data-toggle-reveal"))
            if ($(this).prop("checked")) {
                targets.show();
            } else {
                targets.hide();
            }
        });
    }
}

const toggle = new Toggle();
export default toggle;