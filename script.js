
const app = document.querySelectorAll('.js-app')
const appContainer = document.querySelector('.app-box')
const startButton = document.querySelector('.start')
const title = document.querySelector('.title')
const score = document.querySelector('.score')
let circles = document.querySelectorAll('.circle')
let scoreTally = document.querySelector('.score-tally')
let level = 0
let arr = []
let userArr = []

scoreTally.innerHTML = level

function resetGame() {
  level = 0
  arr = []
  userArr = []
  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }
  startButton.style.display = 'initial'
  title.innerHTML = 'Game Over'
  score.style.display = 'none'
}

function newGame() {
  startButton.style.display = 'none'
  score.style.display = 'initial'
  title.innerHTML = 'Wait'
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

  title.innerHTML = 'Wait'

  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      selectApp(arr[i])
    }, 1500 * (i + 1));
  }

}


function userRound() {

  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }

  title.innerHTML = 'Go'

  appContainer.classList.remove('blocked')

  for (let i = 0; i < app.length; i++) {
    app[i].addEventListener("click", function () {

      let choice = app[i].dataset.apps
      userArr.push(choice)

      selectApp(choice)

      for (m = 0; m < userArr.length; m++) {
        if (userArr[m] !== arr[m]) {
          resetGame()
          return
        }

        else if (userArr[m] == arr[m] && userArr.length === arr.length) {
          title.innerHTML = "Success!"
          userArr = []
          console.log(userArr)
          setTimeout(() => {
            nextRound();
          }, 1000);
          return
        }
      }

    })
  }

}



function nextRound() {

  level += 1
  scoreTally.innerHTML = level
  appContainer.classList.add('blocked')
  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }
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

