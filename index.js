const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const app = new express();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const BlogPost = require('./models/BlogPost.js');

app.set('view engine', 'ejs');


const customMiddleWare = (req, res, next) => {
  console.log('Custom middleware called')
  next()
}

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect('/post/new')
  }
  next()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(fileUpload())

app.use('/posts/store', validateMiddleWare);




app.listen(4000, () => {
  console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', { blogposts });
});

app.get('/about', (req, res) => {
  res.render('about', {});
});

app.get('/contact', (req, res) => {
  res.render('contact', {});
});

app.get('/post/new', (req, res) => {
  res.render('create');
});

app.get('/post', async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', { blogposts });;
});

app.get('/post/:id', async (req, res) => {
  debugger;
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', { blogpost });
});

app.post('/posts/store', (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error) => {
    await BlogPost.create({
      ...req.body,
      image: 'public/assets/img/' + image.name
    })
    res.redirect('/')
  })
});
