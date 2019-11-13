import $ from "jquery";

class Table {
    public init() {
        this.convertToLink();
        this.showHover();
    }

    public convertToLink() {
        $("[data-link]").each(function () {
            const el = $(this);
            const link = el.attr("data-link");
            el.css("cursor", "pointer");
            el.on("click", (e) => {
                if ($(e.target).is("a") || $(e.target).is("button")) {
                    return;
                }

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