var express = require("express");
var router = express.Router();
const UserTodo = require("../models/todos");

/* GET all todos */
router.get("/todo", async (req, res) => {
  try {
    const todos = await UserTodo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error on fetching Data" });
  }
});

/* Create a new todo */
router.post("/createTodo", async (req, res) => {
  try {
    const { name, email, description, status } = req.body;
    const todo = await UserTodo.create({ name, email, description, status });
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error while creating todo" });
  }
});

/* Delete a todo */
router.delete("/deleteTodo/:id", async (req, res) => {
  try {
    await UserTodo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

/* Update a todo */
router.put("/updateTodo/:id", async (req, res) => {
  try {
    const { name, email, description, status } = req.body;
    const todo = await UserTodo.findByIdAndUpdate(
      req.params.id,
      { name, email, description, status },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

module.exports = router;
