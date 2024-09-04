
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');


//route1 : allnotes user get:api/notes/allnotes  :login requred
router.get('/allnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send(error.message);
    }    



})



//route2 : addnote post:api/notes/addnote  :login requred
router.post('/addnote',fetchuser,[
    //express validation
    body('title','your title charecter must be at least 3').isLength({ min: 3 }),
    body('description','description must be min 6 digit').isLength({ min: 6 }),
],async(req,res)=>{
    const userId = req.user.id;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag} = req.body;
        const note = new Notes({
            title,description,tag,user:userId
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
})



//route3 : updatenote post:api/notes/updatenote  :login requred
router.put('/updatenote/:id',fetchuser,[
    //express validation
    body('title','your title charecter must be at least 3').isLength({ min: 3 }),
    body('description','description must be min 12 digit').isLength({ min: 12 }),
],async(req,res)=>{
    const userId = req.user.id;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // cheak its current user note
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(400).json({ errors: "not found" });
    }
    if(note.user.toString() !== userId){
        return res.status(400).json({ errors: "not allowed to update" });
    }
    try {
        const {title,description,tag} = req.body;
        let newNote = {};
        if(title){{newNote.title=title}}
        if(description){{newNote.description=description}}
        if(tag){{newNote.tag=tag}}
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.send(note);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
})


//route4 : deletenote post:api/notes/deletenote  :login requred
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const userId = req.user.id;
    // cheak its current user note
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(400).json({ errors: "not found" });
    }
    if(note.user.toString() !== userId){
        return res.status(400).json({ errors: "not allowed to update" });
    }
    try {
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"delete successfully",note:note});
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
})

module.exports = router;