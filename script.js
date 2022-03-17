
const app = document.querySelectorAll('.js-app')
const startButton = document.querySelector('.start')
const command = document.querySelector('.command')
const score = document.querySelector('.score')
const steve = document.querySelector('.title')
let scoreTally = document.querySelector('.score-tally')
let level = 0
let arr = ['instagram', 'facebook', 'instagram', 'twitter', 'tiktok']
let userArr = []

scoreTally.innerHTML = level

function startGame() {
  startButton.style.display = 'none'
  steve.style.display = 'none'
  command.style.display = 'initial'
  score.style.display = 'initial'
}

function nextPing() {
  const apps = ['instagram', 'facebook', 'twitter', 'tiktok'];
  const randomApp = apps[Math.floor(Math.random() * apps.length)];
  return randomApp;
}

function playRound() {

  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      document.querySelector(`[data-sound='${arr[i]}']`).play()
      let circle = document.querySelector(`[data-ping='${arr[i]}']`)
      if (circle.style.display !== 'flex') {
        circle.innerHTML = 1
        circle.style.display = 'flex'
      }
      else {
        circle.innerHTML = 2
      }
    }, 2000 * i);
  }
}

startButton.addEventListener("click", function () {
  setTimeout(() => { startGame() }, 200);
  playRound()
})

