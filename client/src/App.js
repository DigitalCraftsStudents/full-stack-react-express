import { useState, useEffect } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import Todos from './components/Todos';

import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

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
  
  return (
    <div className="App">
      { isLoggedIn ?
        <>
          <h1>Welcome to the Todo app!</h1>
          <Logout doLogout={doLogout} />
          <Todos todos={todos} />
        </>
      :
      <Login doLogin={doLogin} />
    }
    </div>
  );
}

export default App;
