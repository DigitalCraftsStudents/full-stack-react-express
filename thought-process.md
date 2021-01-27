
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


