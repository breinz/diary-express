import $ from "jquery";
import request from "superagent";

class Link {
    public init() {
        //onclick="return confirm('Are you 100% sure?')"
        $("[data-delete]").click(function (event) {
            event.preventDefault();

            if (confirm($(this).attr("data-delete"))) {
                request
                    .delete($(this).attr("href"))
                    .then(res => {
                        if (res.body && res.body.success === true) {
                            window.location.href = res.body.redirect;
                        } else {
                            alert("Something went wrong! 1");
                        }
                    })
                    .catch(err => {
                        alert("Something went wrong! 2");
                        console.log(err)
                    });
            }
        })
    }
}

export default new Link();