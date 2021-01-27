const express = require('express');
const router = express.Router();

const {
  list,
  showForm,
  processForm,
  updateTodo
} = require('../controllers/todo');

router
  .get('/', list)
  .get('/new', showForm)
  .post('/new', processForm)
  .put('/:id', updateTodo)

module.exports = router;
