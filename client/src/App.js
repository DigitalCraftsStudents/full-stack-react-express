import { useState, useEffect } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import Todos from './components/Todos';

import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function doLogin() {
    console.log('sweet you are logged in now, buddy');
    setIsLoggedIn(true);
  }
  
  function doLogout() {
    console.log('all logged out');
    setIsLoggedIn(false);
  }


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
      <Logout doLogout={doLogout} />        
      :
      <Login doLogin={doLogin} />
    }

      <Todos />

    </div>
  );
}

export default App;
