import path from "path";
import util from "util";

import sprintf from "sprintf-js";
import fs from "fs";

const readFile = util.promisify(fs.readFile);

export default class T {

    private lang: string;

    private data: any;
    private default_data: any;

    constructor(lang: string) {
        this.lang = lang;
    }

    public async load() {
        await Promise.all([
            this.load_data(),
            this.load_default_data()
        ]);
    }

    /**
     * Get a translation
     * @param str The path to the translation in json
     * @param args Args used to replace %s
     */
    public t(str: string, ...args: (string | number)[]): string {
        return this._t(str, args, this.data);
    }

    /**
     * Get a pluralisation
     * @param str The path to the pluralisation in json
     * @param count Value used to pluralize
     */
    public p(str: string, count: number): string {
        return this._p(str, count, this.data);
    }

    private default_t(str: string, args: (string | number)[]): string {
        return this._t(str, args, this.default_data);
    }

    private default_p(str: string, count: number): string {
        return this._p(str, count, this.default_data);
    }

    private async load_data() {
        let data: Buffer;

        try {
            data = await readFile(path.join(__dirname, "lang", `${this.lang}.json`));
        } catch (error) {
            throw error;
        }

        this.data = JSON.parse(data.toString());
    }

    private async load_default_data() {
        let default_data: Buffer;

        try {
            default_data = await readFile(path.join(__dirname, "lang", `en.json`));
        } catch (error) {
            throw error;
        }

        this.default_data = JSON.parse(default_data.toString());
    }

    /**
     * @param str 
     */
    private writeMissing(str: string, params: any, pluralisation: boolean = false): string {
        let ar = str.split(".");

        if (!str || str == "undefined") return;
        if (ar[ar.length - 1] == "undefined") return;

        let result = this.default_data;

        ar.forEach((step, index) => {
            if (result[step]) {
                result = result[step];
            } else {
                if (index == ar.length - 1) {
                    const value = `*${step[0].toUpperCase()}${step.substr(1)}`;
                    if (pluralisation) {
                        result[step] = {
                            none: value,
                            one: value,
                            many: value
                        };
                    } else {
                        result[step] = value;
                    }
                } else {
                    result[step] = {};
                    result = result[step];
                }
            }
        });

        fs.writeFile(path.join(__dirname, "lang", "en.json"), JSON.stringify(this.default_data, null, 4), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("default lang file updated with %s", str);
        });

        return `*${ar[ar.length - 1][0].toUpperCase()}${ar[ar.length - 1].substr(1)}`;
    }

    private writeMissingP(str: string, count: number): string {
        return this.writeMissing(str, null, true);
    }

    private _t(str: string, args: (string | number)[], dataset: any): string {
        const fallback: any = dataset == this.data ? this.default_t.bind(this) : this.writeMissing.bind(this);

        let ar = str.split(".");

        try {
            ar.forEach(step => {
                dataset = dataset[step];
            });
        } catch (error) {
            return fallback(str, args);
        }

        if (!dataset || dataset.length == 0) {
            return fallback(str, args);
        }

        return sprintf.vsprintf(dataset, args);
    }

    private _p(str: string, count: number, dataset: any): string {
        const fallback = dataset == this.data ? this.default_p.bind(this) : this.writeMissingP.bind(this);

        let ar = str.split(".");

        try {
            ar.forEach(step => {
                dataset = dataset[step];
            });
        } catch (error) {
            return fallback(str, count);
        }

        if (!dataset || dataset.length == 0) {
            return fallback(str, count);
        }

        dataset = count == 0 ? dataset.none : count == 1 ? dataset.one : dataset.many;

        return dataset;
    }
}