import { PageModel } from "../model/PageModel";

export default class PageValidator {

    private data: PageModel;

    public errors: { [index: string]: string };

    constructor(data: PageModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {
        this.titleRequired();
        this.urlRequired();
        this.idRequired();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.titleRequired();
        this.urlRequired();
        this.idRequired();

        return Object.keys(this.errors).length == 0;
    }

    private titleRequired() {
        if (!this.data.title || this.data.title.trim().length == 0) {
            this.errors.title = "required";
        }
    }
    private urlRequired() {
        if (!this.data.url || this.data.url.trim().length == 0) {
            this.errors.url = "required"
        }
    }
    private idRequired() {
        if (!this.data.id || this.data.id.trim().length == 0) {
            this.errors.id = "required"
        }
    }
}