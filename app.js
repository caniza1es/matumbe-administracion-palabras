// app.js
const express = require('express');
const mongoose = require('mongoose');
const wordController = require('./controllers/wordController');
const path = require('path');

const app = express();


mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/add', wordController.addWordForm);
app.post('/add', wordController.addWord);

app.get('/admin', wordController.adminView);
app.post('/admin/approve/:id', wordController.approveWord);
app.post('/admin/delete/:id', wordController.deleteWord);
app.get('/admin/edit/:id', wordController.editWordForm);
app.post('/admin/edit/:id', wordController.updateWord);

app.get('/', (req, res) => {
    res.redirect('/add');
});

app.get('/user', (req, res) => {

    res.send('Perfil de usuario');
});


app.listen(3000)
