import format from "date-format";
import T from "../T";

export default class Util {

    private t: T;

    constructor(t?: T) {
        this.t = t;
    }

    public todayOrDate(date: Date) {

        if (date.getTime() > new Date().setHours(0, 0, 0, 0)) {
            return this.t.t("today");
            //return format("hh:mm", date);
        }

        return format("dd/MM/yy", date);
    }

    /**
     * Begining of month
     */
    public bom(): Date {
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(1);
        return d;
    }

    /**
     * Begining of next month
     */
    public bonm(): Date {
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
        return d;
    }
}