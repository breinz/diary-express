export default class FormHelper {

    private query: { [index: string]: string };
    private target: any;

    constructor(query: any, target: any) {
        this.query = query;
        this.target = target;
    }

    public extractDate(key: string) {
        if (this.query[key] && (<string>this.query[key]).match(/^\d{4}-\d{2}-\d{2}$/)) {
            let d: Date = new Date(this.query[key]);

            if (isNaN(d.getTime())) {
                d = null
            }

            this.target[key] = d;
        }
    }

    public extractString(key: string) {
        if (this.query[key]) {
            this.target[key] = this.query[key];
        }
    }
}