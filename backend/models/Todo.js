const mongoose = require("mongoose");

const ToDoScheme = new mongoose.Schema({
    mail:String,
    todo_id:Number,
    todo_title:String,
    todo_description:String,
    todo_created_at:Date,
    todo_due_date:Date,
})

const ToDoModel = mongoose.model("todo",ToDoScheme);
module.exports = ToDoModel;