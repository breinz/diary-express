import $ from "jquery";

class Table {
    public init() {
        this.convertToLink();
        this.showHover();
    }

    public convertToLink() {
        $("[data-link]").each(function () {
            const link = $(this).attr("data-link");
            $(this).css("cursor", "pointer");
            $(this).on("click", () => {
                window.location.href = link;
            })
        })
    }

    public showHover() {
        $("[data-show-hover]").each(function () {
            const content = $("." + $(this).attr("data-show-hover"));
            content.hide();
            $(this).on("mouseover", () => {
                content.show();
            });
            $(this).on("mouseout", () => {
                content.hide();
            });
        });
    }
}

export default new Table();