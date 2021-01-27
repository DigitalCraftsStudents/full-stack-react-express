import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {      
      const resp = await axios.post('/api/users/login', {
        username,
        password
      });
      console.log(resp);
      
      // Send that "up" to the App
      props.doLogin();
      setMessage('');
    } catch (e) {
      // invalid user or password, message the user
      setMessage('Invalid username and password');
    }
  };
  
  return (
    <section>
      <h1>Login</h1>
      
      { message && <h2>{message}</h2>}
      
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
          />    
        </label>
        <br />
        <input type="submit" />
      </form>
    </section>
  );
}

export default Login;
