import express from "express";
import morgan from "morgan";
import {engine}from 'express-handlebars'; 

import path from "path";

import indexRoutes from "./routes";
import tasksRoutes from "./routes/tesks"

class Application{
    app: express.Application;

    constructor(){
        this.app=express();
        this.setting();
        this.middlewares();
        this.routes();
    }
    setting(){
    this.app.set("port",3000);
    this.app.set("views",path.join(__dirname,"views"));
    this.app.engine(".hbs",engine({ layoutsDir:path.join(this.app.get("views"),"layouts"),
        partialsDir:path.join(this.app.get("views"),"partials"), runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
          },
        defaultLayout:"main",
        extname:".hbs"

    })
    );
    this.app.set("view engine",".hbs")
    this.app.use(express.static(path.join(__dirname,"public")) )   
}
    middlewares(){
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}))
    }
    routes(){
        this.app.use(indexRoutes)
        this.app.use("/tasks",tasksRoutes)
    }
    start(){
    this.app.listen(this.app.get("port"),()=>{
        console.log("Server on port ", this.app.get('port'))
    })
}

}
export default Application;

// const app = new Application();