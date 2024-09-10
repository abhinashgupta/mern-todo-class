var express = require('express');
var router = express.Router();
const UserTodo = require('../models/todos')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', async (req, res) => {
  try {
    const todos = await UserTodo.find();
    // res.render('todo' , {todos});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error on fetching Data" })
  }
});

router.post("/createTodo", async (req, res) => {
  const { name, email, description, status, userId } = req.body;
  if (userId) {
    await UserTodo.findByIdAndUpdate(
      { _id: userId },
      { name, email, description, status }
    );
    res.redirect('/todo');
  } else {
    const todo = await UserTodo.create({
      name,
      email,
      description,
      status,
    });
    res.redirect("/todo");
  }
  
});

router.get('/deleteTodo/:id', async (req, res) => {
  const todo = await UserTodo.findByIdAndDelete({ _id: req.params.id });
  res.redirect('/todo');
});

router.post('/updateTodo/:id', async (req, res) => {
  const {name , email , description , status } = req.body;
  const todo = await UserTodo.findByIdAndUpdate(
    { _id: req.params.id },
    { name, email, description, status }
  );
  res.redirect('/todo');
})

module.exports = router;
