import React, { useState } from 'react';

function Todos(props) {
  return (
    <section>
      <h2>Todos:</h2>
      <ul>
        {props.todos.map(todo => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default Todos;
