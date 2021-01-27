const { layout } = require('../utils')
const { Todo } = require('../models');

const showForm = (req, res) => {
  res.render('todos/form', {
    locals: {
      title: 'Add new post'
    },
    ...layout
  });
};

const updateTodo = async (req, res) => {
  const { title, isComplete } = req.body;
  const { id } = req.params;
  try {
    const updated = await Todo.update({
      title,
      isComplete
    }, {
      where: {
        id
      }
    });
    res.status(200).json({
      message: "updated",
    });
    
  } catch (e) {
    res.status(400).json({
      message: "could not update",
    });
  }
};

const processForm = async (req, res) => {
  const { title } = req.body;
  const { id } = req.session.user;
  
  if (title && id) {
    const newTodo = await Todo.create({
      title,
      isComplete: false,
      userId: id
    });
    console.log(newTodo);
    // res.redirect(`${req.baseUrl}/`)
    console.log("API: Created new todo");
    res.status(200).json({
      message: "Created new todo",
      id
    });
    
  } else {
    res.redirect(req.url);
  }
  
};

const list = async (req, res) => {
  if (!req.session.user) {
    console.log("API: No user in session");
    res.status(400).json({
      message: "No user in session",
    });
    return;
  }
  
  const { id } = req.session.user;
  if (id) {
    // Show this user's Todos
    const todos = await Todo.findAll({
      where: {
        userId: id
      }
    });
    // res.render('todos/list', {
    //   locals: {
    //     todos
    //   },
    //   ...layout
    // });
    console.log("API: Listing todos");
    res.status(200).json({
      message: "Todo listing",
      todos
    });
    return;    
  } else {
    // redirect
    // res.redirect('/');
    console.log("API: No user id in session");
    res.status(400).json({
      message: "Not logged in",
    });
    return;
  }
};

module.exports = {
  showForm,
  processForm,
  list,
  updateTodo
};
