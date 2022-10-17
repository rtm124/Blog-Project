const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const path =require('path')

const app = new express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})

app.set('view engine', 'ejs')

app.listen(4000, ()=> {
    console.log ('App listening on port 4000')

})

app.get('/', (req,res)=> {
   res.render('index', { });
})

app.get('/about', (req,res)=> {
   res.render('about', { });
})

app.get('/contact', (req,res)=> {
   res.render('contact', { });
})

app.get('/post', (req,res)=> {
   res.render('post', { });
})

app.get('/post/new', (req,res)=> {
   res.render('create');
})

app.post('/posts/store', (req,res)=> {
   console.log(req.body)
   res.redirect('/');
})

