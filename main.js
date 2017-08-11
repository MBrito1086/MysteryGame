const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


const app = express();

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());



const randomWord = words[Math.floor(Math.random() * words.length)];


const PLACEHOLDER = "_";

const letterGuess = [];

const attempts = 8;


const hangman = (randomWord, guesses) => {
  randomWord
    .split('')
    .map(letter => guesses.includes(letter) ? letter : PLACEHOLDER)
    .join(' ');}

const invisWord = hangman(randomWord);

invisWord.push(hangman(randomWord, letterGuess));

app.get('/', (req, resp) => {


  resp.render('home',  { invisWord, attempts });
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
    } else guessed.push(guess)
  }

console.log(guessed);

  // req.session.letterGuess = letterGuess
  // resp.render('home', { invisWord })
  resp.redirect('/');
})








app.listen(3000, () => {
  console.log("Magic is happening on port 3000");
})
