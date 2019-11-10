import { EventModel } from "../model/EventModel";

export default class EventValidator {

    private data: EventModel;

    public errors: { [index: string]: string };

    constructor(data: EventModel) {
        this.data = data;
        this.errors = {};
    }

    public validNew(): boolean {
        this.titleRequired();
        this.categoryValid();

        return Object.keys(this.errors).length == 0;
    }

    private titleRequired() {
        if (!this.data.title || this.data.title.trim().length == 0) {
            this.errors.title = "required";
        }
    }

    private categoryValid() {
        if (this.data.category == "null") {
            this.data.category = null;
        }
    }
}