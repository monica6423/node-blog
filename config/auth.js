module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('error_msg', 'Please login to view that resource. Account: test@test.com. Password: test123');
      res.redirect('/users/login');
    }
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/compose');
  },
};
