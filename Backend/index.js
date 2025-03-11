
//importing using common js
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

//importing using es module
//import express from "express";


const app = express();

//setting up middleware

app.use(express.json()) //
app.use(express.urlencoded({extended: true}))


app.use(cors("*"));

//Importing model
const TodoModel = require("./model/Todo.js");



const connectionString = "mongodb+srv://jess:FJxlQQcOsVRz8nJx@cluster0.w4ak2.mongodb.net/todoDB" //we added the name of the database to the end of the string
mongoose.connect(connectionString).then(() => {
    console.log("connected to the database");
    app.listen(3000, function(){
        console.log("server running at port 3000");
    })

}).catch((err) => console.log("err"))

//CRUD operations

//Get method
//Read method
app.get("/todos", async (req, res) => {
   // res.send("Hello Perth!");
   try {
    const response = await TodoModel.find({})
    
   // console.log(response);

    res.json(response)

   } catch (err) {
    console.log(err)
   }
});


//create method
app.post("/todos", async (req, res) => {
    try{
        console.log(req.body);

        const todo = req.body;

        //add new item to the database
        const newItem = await TodoModel.create(todo);


        //res.send("Your post method is working");
        res.status(200).send("successful")

    } catch (err) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})

//delete method
app.delete("/todos/:id", async(req, res) => {
    try {
        let id = req.params.id;

        console.log(id)
        const deletedItem = await TodoModel.deleteOne({
            _id: id
        });

        res.status(200).send("Delete successful")

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")

    }
})

app.put("/todos/:id", async(req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      
      const { text } = req.body;
     
      const updateOptions = {text: text};
      const updateItem = await TodoModel.findByIdAndUpdate(id, updateOptions, {new: true});

      res.status(200).send("Updated Item")

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
    
})