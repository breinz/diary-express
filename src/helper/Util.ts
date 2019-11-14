import format from "date-format";
import T from "../T";

export default class Util {

    /** Translation engine */
    private t: T;

    constructor(t?: T) {
        this.t = t;
    }

    /**
     * Formats a date into something readable and displayable (including stuff like Today, Yesterday, etc.)
     * @param date The date to format
     */
    public todayOrDate(date: Date) {

        let d = new Date();

        if (date.getTime() >= d.setHours(0, 0, 0, 0)) {
            return this.t.t("today");
            //return format("hh:mm", date);
        } else {
            d.setDate(d.getDate() - 1);
            d.setHours(0, 0, 0, 0);
            if (date.getTime() > d.getTime()) {
                return this.t.t("yesterday");
            }

            return format("dd/MM/yy", date);
        }
    }

    /**
     * Because I didn't find anything handier so far
     * @param date 
     */
    public dateToInput(date: Date | string): string {
        return new Date(date).toISOString().substr(0, 10);
    }

    /**
     * Begining of month
     * @returns Date of the first day of the month at midnight
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

    /**
     * How many days in this month
     * @param date Any date (only the month matters) or null for current month
     */
    public daysInMonth(date?: Date): number {
        let d = date || new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
        d.setDate(d.getDate() - 1);
        return d.getDate();
    }

    public prevMonth_url(): string {
        let d = new Date();
        d.setMonth(d.getMonth());
        return d.getFullYear() + "-" + (this.zero(d.getMonth()));
    }

    /**
     * Return a 2 digits string starting with 0 if the input is below 10
     * @param value The value
     */
    public zero(value: number): string {
        if (value <= 9) {
            return "0" + value;
        }

        return value.toString();
    }

    /**
     * Get a font awesome icon class for an element
     * @param element The element having a `icon` property
     * @param defaut The element category [event, expense, ...]
     */
    public icon(element: { icon: string }, defaut?: string): string {
        if (element == null || element.icon == null || element.icon.trim().length == 0) {
            switch (defaut) {
                case "eventCategory":
                case "event":
                    return "fa-calendar-alt";
                case "expenseCategory":
                case "expense":
                    return "fa-euro-sign";
                case "people":
                    return "fa-user";
                case "list":
                    return "fa-list-ul";
                default:
                    return "fa-question";
            }
        } else {
            return `fa-${element.icon}`;
        }
    }

    /**
     * Get a icon color for an element
     * @param element The element having a `color` property
     * @param defaut The element category [event, expense, ...]
     */
    public icon_color(element: { color: string }, defaut: string): string {
        if (element == null || element.color == null || element.color.trim().length == 0) {
            if (defaut === "event" || defaut === "expense") {
                return this.t.t(`${defaut}Category.none.color`);
            }

            return "#CCC";
        }
        return element.color;
    }
}