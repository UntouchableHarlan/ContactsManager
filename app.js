const express = require('express');
const app = express();
// const firebase = require("firebase");


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('landingPage');
});

app.get('/signup', function (req, res) {
  res.render('signup');
})

app.get('/login', function (req, res) {
  res.render('login');
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
  console.log('Press Ctrl+C to quit.');
});
