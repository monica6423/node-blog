const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
//require multer to handle image
const multer = require('multer');
const { ensureAuthenticated } = require('../config/auth');

var upload = multer({ dest: 'public/images' });

var _ = require('lodash');

const app = express();
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//const mongodbURI ='mongodb+srv://admin-monica:accounting23@cluster0-csqhh.mongodb.net/blogDB';
//connect Mongo DB URL
//mongoose.connect(mongodbURI, { useNewUrlParser: true });
//create new schema

const postSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: {
    type: Date,
    default: Date.now
  },
  mainimage: Buffer,
  content: String,
  likes_count: Number,
  comments: [
    {
      commentid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      body: { type: String },
    },
  ],
  visitor: String,
});

//create a new mongoose model using the schema to define your posts collection.
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
