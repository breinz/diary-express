import { ExpenseModel } from "../model/ExpenseModel";

export default class ExpenseValidator {

    private data: ExpenseModel;

    public errors: { [index: string]: string };

    constructor(data: ExpenseModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {

        this.amountRequired();
        this.dateRequired();
        this.categoryValid();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {

        this.amountRequired();
        this.dateRequired();
        this.categoryValid();

        return Object.keys(this.errors).length == 0;
    }

    private amountRequired() {
        if (!this.data.amount || isNaN(this.data.amount)) {
            this.errors.amount = "required";
        }
    }

    private dateRequired() {
        if (!this.data.date) {
            this.errors.date = "required";
        }
    }

    private categoryValid() {
        if (this.data.category == "null") {
            this.data.category = null;
        }
    }
}