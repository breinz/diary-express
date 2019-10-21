import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";

export default class ExpenseCategoryValidator {

    private data: ExpenseCategoryModel;

    public errors: { [index: string]: string };

    constructor(data: ExpenseCategoryModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();

        return Object.keys(this.errors).length == 0;
    }

    private nameRequired() {
        if (!this.data.name || this.data.name.trim().length == 0) {
            this.errors.name = "required";
        }
    }

    private iconRequired() {
        if (!this.data.icon || this.data.icon.trim().length == 0) {
            this.errors.icon = "required";
        }
    }

    private colorRequired() {
        if (!this.data.color || this.data.color.trim().length == 0) {
            this.errors.color = "required";
        }
    }
}