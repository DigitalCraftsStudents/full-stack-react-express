import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post('/api/users/login', {
      username,
      password
    });
    console.log(resp);
    // Send the user id "up" to the App
    props.doLogin(resp.id);
  };
  
  return (
    <section>
      <h1>Login</h1>
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
