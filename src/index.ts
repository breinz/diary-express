import express from "express"
import path from "path"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"
import http from "http";

import config from "./config";
import userMiddleware from "./middleware/userMiddleware"
import flashMiddleware from "./middleware/flashMiddleware"
import mainRouter from "./router/mainRouter";
import T from "./T"
import Util from "./helper/Util"
import { watch } from "fs"
//import nodemailer from "pug-mailer";
const mailer = require("pug-mailer")

Date.prototype.removeTimezoneOffset = function () {
    this.setMinutes(this.getMinutes() - this.getTimezoneOffset());
}

let app = express();

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    next();
});

// Init mailer
app.use((req, res, next) => {
    mailer.init(config.EMAIL_TRANSPORT);

    /*mailer
        .send({
            from: "diary@julien-breiner.com",
            to: "julien.breiner@gmail.com",
            subject: "Test from Diary",
            template: "test"
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));*/

    next();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());
app.use(session({
    secret: "blahpomblah",
    cookie: {
        maxAge: 1000 * 60
    },
    resave: true,
    saveUninitialized: true
}));

// Static content
app.use(express.static("dist/assets"));

// View engine
app.set("view engine", "pug");
app.disable("view cache");
app.set('views', path.join(__dirname, '../src/views'));

// Find logged in user
app.use(userMiddleware.getCurrentUser);

// Get user's lang
app.use(async (req, res, next) => {

    let lang: string;

    if (req.current_user) {
        lang = req.current_user.lang || "en";
    } else {
        lang = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || process.env.LANGUAGE || "en";
        lang = lang.substr(0, 2);
    }

    const t = new T(lang);
    await t.load();
    res.locals.t = t.t.bind(t);
    res.locals.p = t.p.bind(t);

    req.t = t.t.bind(t);

    req.lang = lang;
    res.locals.current_lang = lang;

    const util = new Util(t);
    req.util = util;
    res.locals.util = util;

    res.locals.cache = false;

    next();
});


// Image resizer
/*app.use((req, res, next) => {
    const file = new File();
    res.locals.resize = file.resize;
    next();
});*/

// Log utils
/*app.use((req, res, next) => {
    const logUtil = new LogUtil();
    res.locals.logUtil = logUtil;
    next();
});*/

/*app.use((req, res, next) => {
    res.locals.util = util;
    next();
});*/


// Initialize flash
app.use(flashMiddleware.init);

// Initialize email
/*app.use((req, res, next) => {

    req.email = new Email({
        message: {
            from: 'no_reply@julien-breiner.com'
        },
        views: { root: path.join(__dirname, 'emails') },
        // uncomment below to send emails in development/test env:
        //send: true,
        transport: config.EMAIL_TRANSPORT
    });
    next();
});*/

app.use(mainRouter);

/*app.use("/login", loginRouter);
app.get("/logout",
    logMiddleware.logout,
    loginController.logout
);
app.use("/signin", signinRouter);
app.use("/password", passwordRouter);

app.use("/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});*/

let server = http.createServer(app);

//reload(app).then((reloadReturned: any) => {


// Start server
server.listen(config.PORT, "0.0.0.0", () => {
    console.log("App running");
    //reloadReturned.reload();


    //new CronJob("*/24 * * * *", () => {
    //    fakeController.init();
    //}, null, true);*/

});
/*}).catch((err: Error) => {

    console.log("Reload could not start", err);
});*/

if (config.NODE_ENV == "development") {

    require("reload")(app).then((reloadReturned: any) => {

        watch(__dirname + "/../src/views", { recursive: true }, (e, f) => {
            reloadReturned.reload();
        });

        watch(__dirname + "/assets", { recursive: true }, (e, f) => {
            reloadReturned.reload();
        });

        watch(__dirname + "/lang", (e, f) => {
            reloadReturned.reload();
        });
    });
}


export default app;