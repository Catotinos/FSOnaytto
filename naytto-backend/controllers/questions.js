const jwt = require("jsonwebtoken");
const questionsRouter = require("express").Router();
const Question = require("../models/question");

questionsRouter.get("/", async (request, response) => {
  const questions = await Question.find({}).populate("questions", {
    topic: 1,
    question: 1,
    firstName: 1,
    lastName: 1,
    phoneNumber: 1,
    email: 1,
  });

  response.json(questions);
});

questionsRouter.get("/:id", async (request, response) => {
  Question.findById(request.params.id)
    .then((question) => {
      if (question) {
        response.json(question);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

questionsRouter.post("/", async (request, response) => {
  const { topic, question, firstName, lastName, phoneNumber, email } =
    request.body;

  const newQuestion = new Question({
    topic,
    question,
    firstName,
    lastName,
    phoneNumber,
    email,
  });

  const savedQuestion = await newQuestion.save();

  response.status(201).json();
});

questionsRouter.delete("/:id", async (request, response) => {
  await Question.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = questionsRouter;
