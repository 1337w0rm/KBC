const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const questionSchema = require("../schemas/questionSchema");
const Question = new mongoose.model("Question", questionSchema);

router.post('/add', async (req, res) => {
    try {
        const question = new Question({
            prompt: req.body.prompt,
            options: req.body.options,
            correctOption: req.body.correctOption
        });
        await question.save();
        res.status(201).send(question);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;