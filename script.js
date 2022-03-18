
const app = document.querySelectorAll('.js-app')
const appContainer = document.querySelector('.app-box')
const startButton = document.querySelector('.start')
const title = document.querySelector('.title')
const footer = document.querySelector('.score')
let circles = document.querySelectorAll('.circle')
let scoreTally = document.querySelector('.score-tally')
let score = 0
let arr = []
let userArr = []

scoreTally.innerHTML = score

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
  footer.style.display = 'none'
}

function newGame() {
  startButton.style.display = 'none'
  footer.style.display = 'initial'
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

  console.log(arr)

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
    circles[k].innerHTML == ''
    circles[k].dataset.num == ''
  }

  title.innerHTML = 'Go'

  appContainer.classList.remove('blocked')

  for (let n = 0; n < app.length; n++) {
    app[n].addEventListener("click", function () {

      userArr.push(app[n].dataset.apps)
      let index = userArr.length - 1;
      console.log(app[n].dataset.apps)

      selectApp(app[n].dataset.apps)

      if (userArr[index] !== arr[index]) {
        setTimeout(() => { resetGame() }, 1000);
        return
      }

      if (userArr[index] === arr[index] && userArr.length === arr.length) {
        title.innerHTML = "Success!"
        userArr = []
        console.log(userArr)
        setTimeout(() => { nextRound() }, 1000);
        return
      }

    })
  }

}


function nextRound() {

  score += 1
  scoreTally.innerHTML = score
  appContainer.classList.add('blocked')
  for (let k = 0; k < circles.length; k++) {
    circles[k].style.display = 'none'
    circles[k].innerHTML = ''
    circles[k].dataset.num = ''
  }
  arr.push(nextPing())

  steveRound()
  setTimeout(() => { userRound() }, score * 1500 + 2000);

}


startButton.addEventListener("click", function () {
  setTimeout(() => { newGame() }, 200);
  nextRound()
})

