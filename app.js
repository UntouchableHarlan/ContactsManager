const express = require('express');
const app = express();
const firebase = require("firebase");
const bodyParser = require('body-parser')
firebase.initializeApp({
  apiKey: "AIzaSyDZs4enZ7bzfU1-lkUmrznTb71uMZ8rcNs",
  authDomain: "contactsmanager-13269.firebaseapp.com",
  projectId: "contactsmanager-13269"
});
var db = firebase.firestore();
var mid = require('./middleware');
var session = require('express-session')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session(
    {
      secret : 'secret key' ,
      resave : false ,
      saveUninitialized : true
    }
));

app.get('/', function (req, res) {
  res.render('landingPage');
});

app.get('/signup', async function (req, res) {
  res.render('signup');
})

app.post('/signup', async function (req, res) {
  console.log(req.body);
  var data = req.body;
  try {
    let user = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    console.log(user.user.uid);
    let userData = {
      name: data.name,
      userId: user.user.uid,
      username: data.userName,
      email: data.email
    }
    console.log(userData);
    let setDoc = db.collection('User').doc(user.user.uid).set(userData);
    res.redirect('/home');
  } catch (e) {
    console.log(`There was an error ${e}`);
    res.render('signup', {
      error: e
    });
  }

  console.log("we got hit");
})

app.get('/login', async function (req, res) {
  res.render('login');
});

app.post('/login', async function (req, res) {
  try {
    let data = req.body;
    let user = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    // get the user
    let userRef = db.collection('User').doc(user.user.uid);
    let doc = await userRef.get();
    console.log(doc.data());
    res.redirect('/home')
  } catch (e) {
    console.log(`There was an error ${e}`);
    res.render('login', {
      error: e
    });
  }
});

app.get('/create', mid.isAuth, async function (req, res) {
  res.render('create');
});

app.post('/create', async function (req, res) {
  try {
    let data = req.body;
    console.log(data);
    let contact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.addPhone,
      email: data.addEmail,
      userId: req.session.userId
    };

    if (data.addRelated != undefined) {
      contact.relation = data.addRelated
    }
    if (data.favorite != undefined) {
      contact.favorite = data.favorite
    }
    if (data.addNickname != undefined) {
      contact.nickname = data.addNickname
    }
    if (data.addPhoneType != undefined) {
      contact.phoneType = data.addPhoneType
    }
    if (data.addEmailType != undefined) {
      contact.emailType = data.addEmailType
    }

    console.log(contact);
    let setDoc = db.collection('Contact').doc().set(contact);
    res.redirect('/home');
  } catch (e) {
    console.log(`There was an error ${e}`);
  }
});

app.get('/home', mid.isAuth, async function (req, res) {
  res.render('home');
});

app.get('/logout', async function (req, res) {
  firebase.auth().signOut();
  res.render('login');
});


app.listen(3000, () => {
  console.log(`App listening on port 3000`);
  console.log('Press Ctrl+C to quit.');
});
