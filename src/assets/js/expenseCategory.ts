import $ from "jquery";

class ExpenseCategory {
    public init() {
        this.updateRadios();

        let radio: JQuery<HTMLElement>;
        $(".category-select").each((index, el) => {
            radio = $(el).children("input[type='radio']");
            radio.hide();
            $(el).click(() => {
                expenseCategory.updateRadios()
            })
        });
    }

    private updateRadios() {
        let radio: JQuery<HTMLElement>;
        let btn: JQuery<HTMLElement>;
        $(".category-select").each((index, el) => {
            radio = $(el).children("input[type='radio']");
            btn = $(el).children(".btn");
            btn.css("backgroundColor", radio.prop("checked") ? $(el).attr("data-color") : "transparent");
        });
    }
}

const expenseCategory = new ExpenseCategory();
export default expenseCategory;