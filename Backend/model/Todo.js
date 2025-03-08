const mongoose = require("mongoose");


//Schema -> Structure of our database/document (equivelant table in relational database ie. table of data)
const TodoSchema = mongoose.Schema({
    //id: {type: Number, required: true}  (mongodb automatically creates this)
    text: {type: String, required: true}
})


const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;