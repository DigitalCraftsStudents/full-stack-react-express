import React, { useState, useEffect } from 'react';

function TodoForm(props) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (props.todo) {
      setTitle(props.todo.title);
    }

  }, [props]);
  
  return (
    <section>
      { props.todo ?       
        <h3> Edit Todo: {title} </h3>
        :
        <h3>Create Todo</h3>      
      }
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(`finished editing todo`);

        // copy all the key/value pairs from props.todo...
        // because the app doesn't handle isComplete
        props.updateTodo({
          ...props.todo,
          title
        });
      }}>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <input type="submit" value="save" />
        </label>
      </form>
    </section>
  );
}

export default TodoForm;
