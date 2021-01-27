const bcrypt = require('bcryptjs');
const { layout } = require('../utils')
const { User } = require('../models');

const newUser = (req, res) => {
    res.render('login-form', {
        locals: {
            title: 'Sign up'
        },
        ...layout
    });
};

const processNewUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username == '' || password == '') {
    // Really should give the user a message
    console.log('username or password is blank', req.baseUrl);
    // res.redirect(`${req.baseUrl}/new`);
    console.log("API: sending back 404");
    res.status(400).json({
      message: "Username or password is blank"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try {
      const newUser = await User.create({
        username,
        hash
      });
      console.log("API: user created successfully");
      res.status(200).json({
        message: "Success"
      });
      // res.redirect(`${req.baseUrl}/login`);
    } catch (e) {
      // e.name will be "SequelizeUniqueConstraintError"
      console.log(e.name);
      if (e.name === "SequelizeUniqueConstraintError") {
        // We should tell the user that the username is taken
        // and then redirect them
      }
      console.log("API: username already taken");
      res.status(400).json({
        message: "Username is already taken"
      });      
      // res.redirect(`${req.baseUrl}/new`);
    }
  }
};

const login = (req, res) => {
  res.render('login-form', {
    locals: {
      title: 'Log in'
    },
    ...layout
  });
};

const processLogin = async (req, res) => {
  const { username, password } = req.body;
  // Get the user by the username
  const user = await User.findOne({
    where: {
      username
    }
  });
  if (user) {
    console.log('valid user...checking password');
    const isValid = bcrypt.compareSync(password, user.hash);
    if (isValid) {
      console.log('password is good!');
      req.session.user = {
        username,
        id: user.id
      };
      req.session.save(() => {
        // res.redirect('/members-only');
        console.log("API: login successful");
        res.status(200).json({
          message: "Login successful",
          id: user.id,
        });
        return;
        
      });

    } else {
      console.log('but password is wrong');
      console.log("API: invalid password for user");
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
      // res.redirect(`${req.baseUrl}/login`);
    }
  } else {
    console.log('not a valid user');
    // res.redirect(`${req.baseUrl}/login`);
    console.log("API: invalid username");
    res.status(400).json({
      message: "Invalid username or password",
    });
    return;
  }
};

const logout = (req, res) => {
  console.log('logging out...');
  req.session.destroy(() => {
    // After deleting session:
    // res.redirect('/');
    console.log("API: invalid username");
    res.status(200).json({
      message: "Logout successful",
    });
    return;
  });
};

const loginStatus = (req, res) => {
  console.log("API: checking login status");
  if (req.session.user) {
    res.status(200).json({
      status: "OK"
    });
  } else {
    res.status(400).json({
      status: "no active session"
    });
  }

};


module.exports = {
  newUser,
  processNewUser,
  login,
  processLogin,
  logout,
  loginStatus
};
