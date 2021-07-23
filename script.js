const start_btn = document.querySelector(".start_btn button")
const info_box = document.querySelector(".info_box")
const quit_btn = info_box.querySelector(".buttons .quit")
const continue_btn = info_box.querySelector(".buttons .continue")
const quiz_box = document.querySelector(".quiz_box")
const option_list = document.querySelector(".option_list")
const timeCount = quiz_box.querySelector(".timer_sec")
const timeLine = quiz_box.querySelector(".time_line")
const timeOff = quiz_box.querySelector(".time_text")

start_btn.onclick = () => {
  info_box.classList.add("activeInfo")
}

quit_btn.onclick = () => {
  info_box.classList.remove("activeInfo")
}

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo")
  quiz_box.classList.add("activeQuiz")
  showQuestions(0)
  queCounter(1)
  startTimer(20)
  startTimerLine(0)
}

let que_count = 0
let que_numb = 1
let counter
let counterLine
let timeValue = 20
let widthValue = 0
let userScore = 0

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box")
const resultQuit = result_box.querySelector(".buttons .quit")

resultQuit.onclick = () => {
  window.location.reload()
}

next_btn.onclick = () => {
  if(que_count < questions.length - 1){
    que_count++
    que_numb++
    showQuestions(que_count)
    queCounter(que_numb)
    clearInterval(counter)
    startTimer(timeValue)
    clearInterval(counterLine)
    startTimerLine(widthValue)
    next_btn.style.display = "none"
    timeOff.textContent = "Qolgan vaqt"
  } else {
    clearInterval(counter)
    clearInterval(counterLine)
    showResultBox()
  }
}

function showQuestions(i) {
  const que_text = document.querySelector(".que_text")
  let que_tag = '<span>'+ questions[i].numb +'. '+ questions[i].question +'</span>'
  let option_tag = '<li class="option"><span>'+ questions[i].options[0] +'</span></li>'
                  + '<li class="option"><span>'+ questions[i].options[1] +'</span></li>'
                  + '<li class="option"><span>'+ questions[i].options[2] +'</span></li>'
                  + '<li class="option"><span>'+ questions[i].options[3] +'</span></li>';
  que_text.innerHTML = que_tag
  option_list.innerHTML = option_tag
  const option = option_list.querySelectorAll(".option")
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSeleced(this)")
  }
}

let tickIcon = '<div class="icon tick"><img class="icon_img" src="./images/check.svg" alt="check"></div>'
let crossIcon = '<div class="icon cross"><img class="icon_img" src="./images/close.svg" alt="check"></div>'

function optionSeleced(answer) {
  clearInterval(counter)
  clearInterval(counterLine)
  let userAns = answer.textContent
  let correctAns = questions[que_count].answer
  let allOptions = option_list.children.length
  if(userAns == correctAns){
    userScore += 1
    answer.classList.add("currect")
    answer.insertAdjacentHTML("beforeend", tickIcon)
    console.log("To'g'ri javon")
  } else {
    answer.classList.add("incurrect")
    answer.insertAdjacentHTML("beforeend", crossIcon)
    console.log('Xato javon')
    for (let i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "option currect")
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
      }
    }
  }
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled")
  }
  next_btn.style.display = "block"
}

function showResultBox() {
  info_box.classList.remove("activeInfo")
  quiz_box.classList.remove("activeQuiz")
  result_box.classList.add("activeResult")
  const score_text = result_box.querySelector(".score_text")
  if(userScore > 12) {
    let scoreTag = '<span>va tabriklaymiz!, Siz<p>'+ questions.length +' ta</p>savoldan<p>'+ userScore +' tasini</p>yecha oldingiz</span>'
    score_text.innerHTML = scoreTag
  }
  else if(userScore > 9) {
    let scoreTag = '<span>va yaxshi 😎👍, Siz<p>'+ questions.length +' ta</p>savoldan<p>'+ userScore +' tasini</p>yecha oldingiz</span>'
    score_text.innerHTML = scoreTag
  }
  else {
    let scoreTag = '<span>va kechirasiz, Siz<p>'+ questions.length +' ta</p>savoldan atigi<p>'+ userScore +' tasini</p>yecha oldingiz</span>'
    score_text.innerHTML = scoreTag
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000)
  function timer() {
    timeCount.textContent = time
    time--
    if(time < 9) {
      let addZero = timeCount.textContent
      timeCount.textContent = "0" + addZero
    }
    if(time < 0) {
      clearInterval(counter)
      timeCount.textContent = "00"
      timeOff.textContent = "Vaqt tugadi"

      let correctAns = questions[que_count].answer
      let allOptions = option_list.children.length

      for (let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correctAns){
          option_list.children[i].setAttribute("class", "option currect")
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")
      }
      next_btn.style.display = "block"

    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29)
  function timer() {
    time += 1
    timeLine.style.width = time + "px"
    if(time > 700) {
      clearInterval(counterLine)
    }
  }
}

function queCounter(i) {
  const totle_que = quiz_box.querySelector(".totle_que")
  let totleQuesCountTag = '<span><p>'+ i +'</p>/<p>'+ questions.length +'</p>Savollar</span>'
  totle_que.innerHTML = totleQuesCountTag
}
