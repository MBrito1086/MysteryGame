const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const fs = require('fs')

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())

const randomWord = words[Math.floor(Math.random() * words.length)]

const invisWord = []

const PLACEHOLDER = "_"

// const guesses = []
//
// const hangman = (randomWord, guesses)
//   randomWord
//     .split('')
//     .map(letter => guesses.includes(letter) ? letter : PLACEHOLDER)
//     .join('')


for (let i = 0; i < randomWord.length; i++) {
  invisWord.push('_')
}

// randomWord.forEach( PLACEHOLDER => {
//   invisWord.push(PLACEHOLDER)
// })

console.log(randomWord);
console.log(invisWord);






app.get('/', (req, resp) => {

  resp.render('home',  { invisWord });
})

app.post('/', (req, resp) => {
  
  resp.redirect('/')
})









app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
