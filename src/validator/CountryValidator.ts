import { CountryModel } from "../model/CountryModel";

export default class CountryValidator {

    private data: CountryModel;

    public errors: { [index: string]: string };

    constructor(data: CountryModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {
        this.nameRequired();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.nameRequired();

        return Object.keys(this.errors).length == 0;
    }

    public nameRequired() {
        if (!this.data.name || this.data.name.trim().length == 0) {
            this.errors.name = "required";
        }
    }
}