import mongoose from "mongoose";

 async function connect(){
    mongoose.set('strictQuery', true);
    try{
      await  mongoose.connect("mongodb://0.0.0.0:27017/29012023-typescript-crud-todo",{
            // useNewUrlParser:true

        });
        console.log(">>> Database connected")
    }
    catch{
console.log("Error")
    }
} 

export default connect;