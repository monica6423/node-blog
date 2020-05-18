const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
var upload = multer({ dest: 'public/images' });
//Post model
const Cate = require('../models/Cate');
const Post = require('../models/Post');
const { ensureAuthenticated } = require('../config/auth');

router.get('/compose', ensureAuthenticated, function (req, res) {
  // const categories = mongoose.get('cates');

  Cate.find(function (err, categories) {
    res.render('compose', {
      categories: categories,
    });
  });
});

router.post('/compose', upload.single('mainimage'), function (req, res) {
  //create a new post document using mongoose model
  const post = new Post({
    title: req.body.postTitle,
    category: req.body.category,
    date: new Date(),
    content: req.body.postBody,
    mainimage: req.file.filename,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect('/');
    }
  });
});

//edit post main page
router.get('/compose/managepost', ensureAuthenticated, function (req, res) {
  Post.find(function (err, posts) {
    res.render('managePost', {
      posts
    });
  });
});

//edit post individual
router.get('/compose/articles/:id', ensureAuthenticated, function (req, res) {
  const requestedPostId = req.params.id;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render('editPost', {
      post: post,
      title: post.title,
      content: post.content,
    });
  });
})

//save the post back to db
router.post('/compose/articles/:id', function (req, res) {

  const id = req.params.id;

  Post.findByIdAndUpdate(id, {
    title: req.body.title,
    content: req.body.content
  }
  )
    .then(function () {
      res.redirect('/compose/managepost');
    })
    .catch(function (err) {
      res.status(422).send("Article update failed.");
    });

});


//delete route 
router.post('/articles/:id/delete', function (req, res) {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(function () {
      res.redirect('/compose/managepost');
    })
    .catch(function (err) {
      res.status(422).send("Article delete failed.");
    });

})


module.exports = router;
