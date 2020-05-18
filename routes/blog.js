const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//require Post model
const Post = require('../models/Post');

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';
//const posts = [];


const url = "https://api.openweathermap.org/data/2.5/weather?q=taipei&appid=171d4e370a8f68e56ad1a13eb0e86126&units=metric"
https.get(url, function (response) {

  response.on("data", function (data) {

    //turn the hex to javascript object
    weatherData = JSON.parse(data);
    temp = weatherData.main.temp;
    weatherDescription = weatherData.weather[0].description;
    icon = weatherData.weather[0].icon;
    imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    //console.log(weatherDescription);

  })
})

// Welcome Page //first page
router.get('/', function (req, res) {


  Post.find(function (err, posts) {
    res.render('home', {
      startingContent: homeStartingContent,
      posts: posts,

    });
  }).sort({ date: -1});

});

//like and unlike button
router.post('/posts/:id/act', (req, res, next) => {
 
  const action = req.body.action;
  console.log(action);
  const counter = action ==='Like' ? +1 : -1;
  console.log(counter);
  Post.update({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
      res.send('');
  });
});


//individual post
router.get('/posts/:postId', function (req, res) {
  //console.log(req.params.postId);
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render('post', {
      post: post,
      title: post.title,
      content: post.content,
    });
  });
});


//individual post comment
router.post('/posts/addcomment', function (req, res) {
  const postid = req.body.postid;
  console.log(req.body.postid);
  console.log(req.body.name);
  console.log(req.body.body);
  var comment = {
    name: req.body.name,
    body: req.body.body,
  };
  console.log(comment);

  Post.findByIdAndUpdate(
    postid,
    { $push: { comments: { name: req.body.name, body: req.body.body }} },
    { safe: true, upsert: true, new: true },
    function (err, updatedProduct) {
      if (err) {
        console.log('something wrog');
      } else {
        res.json(comment);
      }
    }
  );
});

module.exports = router;
