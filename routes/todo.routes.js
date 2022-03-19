const { Router } = require('express');

const Todo = require('../models/Todo');
const User = require('../models/User');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allTodos = await Todo.find().populate(
      'user',
      '-passwordHash -todos -__v'
    );
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { email } = req.user;

  try {
    const userId = await User.findOne({ email }).select('_id');
    const newTodo = await Todo.create({ ...req.body, user: userId });
    const { _id } = newTodo;
    await User.findOneAndUpdate({ email }, { $push: { todos: _id } });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json('Successfully excluded note');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
