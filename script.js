
const app = document.querySelectorAll('.js-app')
const appContainer = document.querySelector('.app-box')
const startButton = document.querySelector('.start')
const command = document.querySelector('.command')
const score = document.querySelector('.score')
const steve = document.querySelector('.title')
let circles = document.querySelectorAll('.circle')
let scoreTally = document.querySelector('.score-tally')
let level = 0
let arr = []
let userArr = []

scoreTally.innerHTML = level


function newGame() {
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


function steveRound() {

  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
  }

  command.innerHTML = 'Wait'

  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      document.querySelector(`[data-sound='${arr[i]}']`).play()
      let circle = document.querySelector(`[data-ping='${arr[i]}']`)

      if (circle.style.display !== 'flex') {
        circle.dataset.num = 1
        circle.innerHTML = circle.dataset.num
        circle.style.display = 'flex'
      }
      else {
        circle.innerHTML = parseInt(circle.dataset.num) + 1
        circle.dataset.num = circle.innerHTML
      }
    }, 1500 * (i + 1));
  }

}

function userRound() {

  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
  }

  command.innerHTML = 'Go'

  appContainer.classList.remove('blocked')

  for (let i = 0; i < app.length; i++) {
    app[i].addEventListener("click", function () {

      let choice = app[i].dataset.apps
      userArr.push(choice)

      document.querySelector(`[data-sound='${choice}']`).play()
      let circle = document.querySelector(`[data-ping='${choice}']`)

      if (circle.style.display !== 'flex') {
        circle.dataset.num = 1
        circle.innerHTML = circle.dataset.num
        circle.style.display = 'flex'
      }
      else {
        circle.innerHTML = parseInt(circle.dataset.num) + 1
        circle.dataset.num = circle.innerHTML
      }

      for (m = 0; m < userArr.length; m++) {
        if (userArr[m] !== arr[m]) {
          console.log("Game over!")
        }
      }

    })


  }

}

function nextRound() {

  level += 1
  scoreTally.innerHTML = level
  appContainer.classList.add('blocked')
  arr.push(nextPing())

  steveRound()
  setTimeout(() => {
    userRound();
  }, level * 1500 + 2000);

}



startButton.addEventListener("click", function () {
  setTimeout(() => { newGame() }, 200);
  nextRound()
})

