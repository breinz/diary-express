import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";

export default class ExpenseCategoryValidator {

    private data: ExpenseCategoryModel;

    public errors: { [index: string]: string };

    constructor(data: ExpenseCategoryModel) {
        this.data = data;

        const form_data = <any>this.data;

        this.data.report = this.data.report || {
            active: form_data["report.active"] == "on",
            times: parseInt(form_data["report.times"]) || 1,
            period: form_data["report.period"] || "day",
            per: form_data["report.per"]
        };

        this.errors = {};
    }

    public validNew(): boolean {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        this.reportValid();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        this.reportValid();

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

    private reportValid() {
        if (!this.data.report.active) return;

        // TODO: Default times = 1
        // times = 0 => error

        if (!this.data.report.per || this.data.report.per.trim().length == 0) {
            this.errors.report = "invalid";
        }

        if (this.data.report.times <= 0) {
            this.errors.report = "invalid";
        }
    }
}