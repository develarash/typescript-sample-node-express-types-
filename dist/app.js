"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const tesks_1 = __importDefault(require("./routes/tesks"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.setting();
        this.middlewares();
        this.routes();
    }
    setting() {
        this.app.set("port", 3000);
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.engine(".hbs", (0, express_handlebars_1.engine)({ layoutsDir: path_1.default.join(this.app.get("views"), "layouts"),
            partialsDir: path_1.default.join(this.app.get("views"), "partials"), runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            },
            defaultLayout: "main",
            extname: ".hbs"
        }));
        this.app.set("view engine", ".hbs");
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use(routes_1.default);
        this.app.use("/tasks", tesks_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
exports.default = Application;
// const app = new Application();
