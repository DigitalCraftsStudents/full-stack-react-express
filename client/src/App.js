import { useState, useEffect } from 'react';

import Login from './components/Login';
import Logout from './components/Logout';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';

import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

  // This is for selecting a todo to edit.
  const [todoId, setTodoId] = useState(0); 
  
  async function retrieveTodos() {
    const resp = await axios.get('/api/todos');
    console.log(resp);

    // axios puts the stuff I care about in .data
    // My server sends back an object that looks like this:   
    setTodos(resp.data.todos);
  }

  async function updateTodo(todo) {
    try {      
      const resp = await axios.put(`/api/todos/${todo.id}`, todo);    
      // One-liner that should be expanded during the demo
      setTodos(todos.map(t => t.id === todo.id ? todo : t));
    } catch (e) {
      console.log('there was an error...we should message the user');
    }    
  }

  function chooseTodo(id) {
    console.log('they clicked a todo to edit');
    setTodoId(id);
  }
  
  // These are the callbacks I'll pass to
  // my Login and Logout components
  function doLogin() {
    console.log('sweet you are logged in now, buddy');
    setIsLoggedIn(true);
  }
  
  function doLogout() {
    console.log('all logged out');
    setIsLoggedIn(false);
  }

  // Need to check if we're logged in "on page load"
  useEffect(() => {
    async function checkLogin() {
      // see if we're logged in
      try {      
        const resp = await axios.get('/api/users/login-status');
        console.log('you are logged in already');
        setIsLoggedIn(true);
      } catch (e) {
        // an error means that we're not logged in
        console.log('error means not logged in');
        setIsLoggedIn(false);
      }
    }
    checkLogin();    
  }, []);

  useEffect(() => {
    console.log(`Value of isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      retrieveTodos();
    }
  }, [isLoggedIn]);
  
  return (
    <div className="App">
      { isLoggedIn ?
        <>
          <h1>Welcome to the Todo app!</h1>
          <Logout doLogout={doLogout} />
          <Todos todos={todos} chooseTodo={chooseTodo} />
          { todoId !== 0 && <TodoForm
                              todo={todos.find(t => t.id === todoId)}
                              updateTodo={updateTodo}
                            />}
        </>
      :
      <Login doLogin={doLogin} />
    }
    </div>
  );
}

export default App;
