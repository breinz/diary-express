import $ from "jquery";

class Table {
    public init() {
        this.convertToLink();
    }

    public convertToLink() {
        $("[data-link]").each(function () {
            console.log($(this));
            const link = $(this).attr("data-link");
            $(this).css("cursor", "pointer");
            $(this).on("click", () => {
                window.location.href = link;
            })
        })
    }
}

export default new Table();