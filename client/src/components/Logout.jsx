import React, { useState } from 'react';
import axios from 'axios';

function Logout(props) {

  const onClick = async (e) => {
    e.preventDefault();
    const resp = await axios.post('/api/users/logout');
    console.log(resp);
    props.doLogout();
  };

  return (
    <button onClick={onClick}>
      Logout
    </button>
  );
}


export default Logout;
