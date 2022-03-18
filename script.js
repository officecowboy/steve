const app = document.querySelectorAll('.js-app')
const appContainer = document.querySelector('.app-box')
const startButton = document.querySelector('.start')
const title = document.querySelector('.title')
const footer = document.querySelector('.score')
const gameOver = document.querySelector('#gameover')
let circles = document.querySelectorAll('.circle')
let scoreTally = document.querySelector('.score-tally')
let score = 0
let arr = []
let userArr = []

scoreTally.innerHTML = score

startButton.addEventListener("click", function () {
  setTimeout(() => { newGame() }, 200)
  nextRound()
})

for (let i = 0; i < app.length; i++) {
  app[i].addEventListener("click", function () {
    let choice = app[i].dataset.apps
    selectApp(choice)
    userArr.push(choice)
    userRound()
  })
}

function resetGame() {

  score = 0
  arr = []
  userArr = []

  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }

  startButton.style.display = 'initial'
  title.innerHTML = 'Game Over'
  gameOver.play()
  footer.style.display = 'none'
}

function newGame() {
  startButton.style.display = 'none'
  footer.style.display = 'initial'
  title.innerHTML = 'Wait'
}

function clearNotifications() {
  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }
}

function nextPing() {
  const apps = ['instagram', 'facebook', 'twitter', 'tiktok'];
  const randomApp = apps[Math.floor(Math.random() * apps.length)];
  return randomApp;
}

function selectApp(x) {
  document.querySelector(`[data-sound='${x}']`).play()

  for (let j = 0; j < circles.length; j++) {
    if (circles[j].dataset.ping == `${x}`) {
      if (circles[j].style.display !== 'flex') {
        circles[j].dataset.num = 1
        circles[j].innerHTML = circles[j].dataset.num
        circles[j].style.display = 'flex'
      }
      else {
        circles[j].innerHTML = parseInt(circles[j].dataset.num) + 1
        circles[j].dataset.num = circles[j].innerHTML
      }
    }
  }
}


function steveRound() {

  console.log(arr)

  title.innerHTML = 'Wait'

  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      selectApp(arr[i])
    }, 1000 * (i + 1));
  }

}


function userRound() {

  let index = userArr.length - 1;

  if (userArr[index] !== arr[index]) {
    resetGame()
    return
  }

  if (userArr[index] === arr[index] && userArr.length === arr.length) {
    title.innerHTML = "Success!"
    setTimeout(() => { nextRound() }, 1000);
    return
  }

}


function nextRound() {

  score += 1
  scoreTally.innerHTML = score
  userArr = []
  appContainer.classList.add('blocked')
  clearNotifications()
  arr.push(nextPing())
  steveRound()
  setTimeout(() => {
    clearNotifications()
    title.innerHTML = 'Go'
    appContainer.classList.remove('blocked')
  }, score * 1000 + 2000)

}

