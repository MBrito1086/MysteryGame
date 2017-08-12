const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const app = express();

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const randomWord = words[Math.floor(Math.random() * words.length)];

const PLACEHOLDER = "_";

const letterGuess = [];

const attempts = 0;

const hangman = (randomWord) =>
  randomWord
  .split('')
  .map(letter => '_')
  .join(' ');

const invisWord = hangman(randomWord).split(' ');

app.get('/', (req, resp) => {
  const invisWord = hangman(randomWord);

  resp.render('home',  { randomWord, invisWord, attempts });
})


app.post('/letters', (req, resp) => {

  const guess = req.body.guess

  req
    .checkBody("guess", "You must guess a single letter")
    .notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    resp.send("You must guess a single letter")
  } else {
    letterGuess.push(guess)
  }

  for (var i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === guess) {
      invisWord[i] = guess;
    }
  }

  if (letterGuess.includes(guess)) {
    alert = "You have guessed this letter!"
  }

  resp.render('home', { invisWord, attempts, letterGuess, randomWord})
  resp.redirect('/');
})

console.log(randomWord);
console.log(invisWord);
console.log(letterGuess)



app.listen(3000, () => {
  console.log("Magic is happening on port 3000");
})
