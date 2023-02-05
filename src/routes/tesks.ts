import {Router , Request , Response} from "express";

const router=Router();

// Model
import Task from "../models/Task";

router.route("/create")
.get((req:Request,res:Response)=>{
    res.render("tasks/create");
})
.post(async(req:Request,res:Response)=>{
    const {title,description}=req.body;
    const newTask= new Task({title,description})
   await newTask.save();
    res.redirect("/tasks/list")
})

router.route("/list")
.get(async(get:Request,res:Response)=>{
const tasks= await Task.find();
console.log(tasks);
res.render("tasks/list",{tasks})
})

router.route("/delete/:id")
.get(async(req:Request,res:Response)=>{
    const {id} =req.params; 
    const task =await Task.findById(id);

   await Task.findByIdAndDelete(id)
   res.redirect("/tasks/list")
})

router.route("/edit/:id")
.get(async(req:Request,res:Response)=>{
    const {id }= req.params;
    const task =await Task.findById(id);
res.render("tasks/edit",{task})
});
router.route("/edit/:id")
.post(async(req:Request,res:Response)=>{
const {id}=req.params;
const {title, description}=req.body;
await Task.findByIdAndUpdate(id,{title,description});
res.redirect("/tasks/list")
})
export default router;  