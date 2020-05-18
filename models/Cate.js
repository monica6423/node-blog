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

const cateSchema = {
  name: String,
};

const Cate = mongoose.model('Cate', cateSchema);

const tech = new Cate({
  name: 'Technology',
});
const bird = new Cate({
  name: 'Bird',
});

//comment.save();
const defaultItems = [tech, bird];
//insert to mongo Database
// Cate.insertMany(defaultItems, function (err) {
//   if (err) {
//     console.log(err);
//   }
// });
module.exports = Cate;
