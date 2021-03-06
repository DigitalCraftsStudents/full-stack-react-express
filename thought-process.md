
For handling authentication, we need to "sync" with the backend.

That means that when we `POST /api/users/login`:

- the server should tell us whether we were successful
  - ideally, using status codes (`200` for success, `400` otherwise)
- the client (React) will send a message "up" to the App on success
  - We can pass it as a prop to any component that needs it
  - (advanced) Alternatively, we can put that in the global context
  
The server will send back the user id in the JSON response.
The login form (onSubmit) can send that "up" to the App.

---

Logging out...do I want a separate Logout Component?
Do I need one?
Or do I need to moving logging in/out to functions in a `utils.js` file?

The difference is that the Login needs a form and Logout is just a button.
But, that button still needs to make an AJAX call and deal with the response (did it work or not).
Based on the response (if it was successful), then we signal up to the App.

That sounds like a component, instead of more code in App.js

---

I need a way to check login status, so I'll be:

- creating a backend route+controller that can tell you if your browser/client has an active session
- creating a function in App.js (since that's where all the auth stuff is really happening) that pings this route.
  - at first, I'll just do this on page load
  - then I can regularly ping the server (once a minute?)
    - if we're no longer logged in, make sure that we don't show certain components (like Todos)
    
    
---

OK, login/logout is working an the (placeholer) Todos component is conditionally rendered. (Only checking on page load if we're already logged in, haven't done the timer yet.)

Next, I can either do a Signup component, or I can work on Todos...

I think Todos might be good. That more full CRUD.

Question: do we store todos globally (in App.js) or in Todos?

Answer: "it depends" on whether I only deal with Todos (listing, creating, editing, deleting) inside of the Todos component and any of its children.

Would my app ever do something like the following:

- Show a reminder about your next Todo in the global header?
- Let you quickly create a Todo from some other part of the app (like a sidebar)?

If so, then you'd want to manage them globally (because the parent has to pass the data down to the children/grand-children, etc. -- or you use the Context API, but that's still on the App level.)

Those features sound more interesting, and I'd probably want the flexibility anyway. So, I'm going to go with that.

---

When do I retrieve the todos?

I can only get them if I'm logged in, so that means:

- at the end of `doLogin()`
- but inside `checkLogin()`, but only if I'm actually logged in.

It's like I need a ...side effect... that runs when I modify the `isLoggedIn` variable. The side effect function can check the value of `isLoggedIn`. If it's true, then I grab the todos.

Question: don't I only need to get todos if I'm switching from `isLoggedIn===false` to `isLoggedIn===true`?

I wonder what the docs say about args that my `useEffect()` callback will receive...

It won't. There's a [stackoverflow discussion](https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect) and a [blog post](https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/) about using `useRef()` in a custom hook, but I don't think I want to go there.

I'm going to stick with a second `useEffect()`, but have it "watch" for changes to `isLoggedIn`. If `isLoggedIn===true` get the Todos and pass them to `setTodos()`.

This will "trick" react into re-rendering, which re-renders the Todos component with the array of todos from the api.

I do have to change what I'm doing with `retrieveTodos()`:

- the todos are actually in `resp.data.todos`

---

For editing a todo, I've got a couple options:

Option #1: have the TodoForm do all the work

- receive the ID from props
- have the form component GET the todo
- manage the form elements in state
- POST the updates from the form component
  - and save to App's state

Option #2: have the App do all the work

- send the todo down as a prop
- manage the form elements in state
- let the form send the changes up to App
- have App POST the update to the api

The difference being whether I want the TodoForm to be aware of the server.
To me, it almost seems like it's better if it doesn't. That way, one could choose to work entirely off of App's state, and sync to the server as necessary.

Option #1 lets me develop the TodoForm in a more "self-contained" way. However, it does require that I'm logged in (which is handled by the App).

I'm going with option #2.
It's not necessarily better, but I see an advantage in making the app be more offline-friendly. (Once the todos are loaded, you can still work with the todos without a network connection.)

---

Making the editing form

I am going to make it reusable for editing and for creating.

It'll need a `useEffect()` that watches the value of `props`.
Inside the side effect callback, I can call `setTitle()

For my form, I need to:

- handle onSubmit (so we can `e.preventDefault()`)
  - when we submit, we need to send the whole todo object even though we're only editing the title
- handle onChange (for the title input)


