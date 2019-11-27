import User, { UserModel } from "../model/UserModel";
import { threadId } from "worker_threads";

export default class UserValidator {

    static EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    private data: UserModel;

    public errors: { [index: string]: string };

    constructor(data: UserModel) {
        this.data = data;
        this.errors = {};
    }

    public async validSignin(): Promise<boolean> {
        this.emailRequired();
        this.emailValid();
        await this.emailUnique();
        this.passwordRequired();
        this.passwordRepeatRequired();
        this.passwordValid();
        this.passwordsMatch();

        return Object.keys(this.errors).length == 0;
    }

    public validLogin(): boolean {
        this.emailRequired();
        this.emailValid();
        this.passwordRequired();
        this.passwordValid();

        return Object.keys(this.errors).length == 0;
    }

    private emailRequired() {
        if (!this.data.email || this.data.email.trim().length == 0) {
            this.errors.email = "required";
        }
    }

    private emailValid() {
        if (!RegExp(UserValidator.EMAIL_REGEXP).test(this.data.email)) {
            this.errors.email = this.errors.email || "unvalid";
        }
    }

    private async emailUnique() {
        const user = await User.findOne({ email: this.data.email });

        if (user) {
            this.errors.email = "taken";
        }
    }

    private passwordRequired() {
        if (!this.data.password || this.data.password.trim().length == 0) {
            this.errors.password = "required";
        }
    }

    private passwordRepeatRequired() {
        if (!this.data.password_repeat || this.data.password_repeat.trim().length == 0) {
            this.errors.password_repeat = "required";
        }
    }

    private passwordValid() {
        if (this.data.password && this.data.password.length < 4) {
            this.errors.password = this.errors.password || "unvalid";
        }
    }

    private passwordsMatch() {
        if (this.data.password != this.data.password_repeat) {
            this.errors.password = this.errors.password || "no_match";
        }
    }
}