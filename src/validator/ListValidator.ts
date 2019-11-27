import { ListModel } from "../model/ListModel";

export default class ListValidator {

    private data: ListModel;

    public errors: { [index: string]: string };

    constructor(data: ListModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {
        this.titleRequired();
        this.iconRequired();
        this.colorRequired();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.titleRequired();
        this.iconRequired();
        this.colorRequired();

        return Object.keys(this.errors).length == 0;
    }

    private titleRequired() {
        if (!this.data.title || !this.data.title.trim().length) {
            this.errors.title = "required";
        }
    }

    private iconRequired() {
        if (!this.data.icon || !this.data.icon.trim().length) {
            this.errors.icon = "required";
        }
    }

    private colorRequired() {
        if (!this.data.color || !this.data.color.trim().length) {
            this.errors.color = "required";
        }
    }
}