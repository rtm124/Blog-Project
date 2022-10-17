const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const BlogPost = require('./models/BlogPost.js');

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

app.set('view engine', 'ejs');

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({});
  //console.log(blogposts);
  res.render('index', { blogposts });
});

app.get('/about', (req, res) => {
  res.render('about', {});
});

app.get('/contact', (req, res) => {
  res.render('contact', {});
});

app.get('/post/new', (req, res) => {
   //  console.log(req);
    res.render('create');
  });

app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', { blogpost });
});



app.post('/posts/store', async (req, res) => {
  //console.log(req.body);
  await BlogPost.create(req.body, (error, blogpost) => {
    res.redirect('/');
  });
});
