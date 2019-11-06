import { PeopleModel } from "../model/PeopleModel";

export default class PeopleValidator {

    private data: PeopleModel;

    public errors: { [index: string]: string };

    constructor(data: PeopleModel) {
        this.data = data;

        this.data.sexe = <any>this.data.sexe == "on";
        this.errors = {};
    }

    public validNew(): boolean {
        this.firstNameRequired();
        this.metInRequired();

        return Object.keys(this.errors).length == 0;
    }

    public validEdit(): boolean {
        this.firstNameRequired();
        this.metInRequired();

        return Object.keys(this.errors).length == 0;
    }

    private firstNameRequired() {
        if (!this.data.firstName || this.data.firstName.trim().length == 0) {
            this.errors.firstName = "required";
        }
    }

    private metInRequired() {
        if (!this.data.metIn || this.data.metIn.trim().length == 0) {
            this.errors.metIn = "required";
        }
    }
}