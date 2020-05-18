const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');

//Login page
router.get('/login', (req, res) => {
  res.render('login');
});

//Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

//Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required field
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  //check password match
  if (password !== password2) {
    errors.push({ msg: 'Password do not match' });
  }
  //check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    //if theres an error, page stays the same
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation pass
    //first make sur user doesnt exist
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exist' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              }) //if save, redirect
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});
//login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/compose',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
module.exports = router;
