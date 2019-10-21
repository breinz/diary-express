import $ from "jquery";

/**
 * Set the width of two or more elements to the widest of them
 * <a data-sameWidth="pom"/>
 * <b data-sameWidth="pom"/>
 * <b data-sameWidth="another"/>
 * a and b will be the same width, c will remain unchanged
 */
class SameWidth {

    private sw: { [index: string]: number } = {};

    public init() {

        const that = this;

        $("[data-sameWidth]").each(function () {
            that.sw[$(this).attr("data-sameWidth")] = Math.max(
                that.sw[$(this).attr("data-sameWidth")] || 0,
                $(this).outerWidth()
            );
        });

        Object.keys(this.sw).forEach(w => {
            $("[data-sameWidth='" + w + "']").outerWidth(this.sw[w]);
        });
    }
}

export default new SameWidth();