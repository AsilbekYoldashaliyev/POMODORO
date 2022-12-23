'use srtict'


const minutDisplay = document.querySelector('.minutes');
const secondDisplay = document.querySelector('.seconds');

const nameTask = document.querySelector('.task-name');

const countNumber = document.querySelector('.count_display');
const countText = document.querySelector('.count_display-text');

const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

const startButton = document.querySelector('.play');

const bntsetting = document.getElementById('btn');
const back = document.getElementById('back');
const box = document.getElementById('box')

bntsetting.addEventListener('click', () => {
box.classList.remove('hidden')
})

back.addEventListener('click', () => {
  box.classList.add('hidden')
})


let isStart = true;

if (isStart) {
    startButton.style.diplay = 'block';
    pauseButton.style.display = 'none';
    resetButton.style.display = 'none'
}

const workTime = 4; // 25
const breakTime = 3;
const longBreakTime = 4;
const pomodorosLimit = 3;


let isPaused = false;
let isReset = false;
let isLongBreak = false;

let minutes = workTime;
let seconds = 1;

let count = 11;

const startTimer = () => {
  const timer = setInterval(() => {
    if (isPaused) {
      clearInterval(timer);
      isPaused = false;
    }

    if (isReset) {
      clearInterval(timer);
      minutes = workTime;
      seconds = 0;
      isReset = false;
    }

//     // agar vaqt 0 ga yetsa
    if (minutes === 0 && seconds === 0) {
      if (count === pomodorosLimit) {
        minutes = longBreakTime;
        countText.textContent = 'Long Break';
      } else if (countText.textContent === 'Break time') {
        minutes = workTime;
        countText.textContent = 'Work time';
      } else {
        minutes = breakTime;
        countText.textContent = 'Break time';
      }

      if (minutes === workTime) {
        count++; 
        countNumber.textContent = `${count} / 4`;
      } else if (isLongBreak) {
        count++; 
      }

      if (count > pomodorosLimit + 1) {
        clearInterval(timer);
        minutes = workTime;
        seconds = 0;
        count = 0;

        startButton.style.display = 'block';
        pauseButton.style.display = 'none';
        resetButton.style.display = 'none';
      }
    }

    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
  }, 10);
};

startButton.addEventListener('click', () => {
  console.log('START');
  startButton.style.display = 'none';
  pauseButton.style.display = 'block';
  resetButton.style.display = 'block';

  startTimer();
});

pauseButton.addEventListener('click', () => {
  console.log('PAUSE');
  startButton.style.display = 'block';
  pauseButton.style.display = 'none';
  resetButton.style.display = 'none';
  isPaused = true;
});

resetButton.addEventListener('click', () => {
  console.log('RESET');
  startButton.style.display = 'block';
  pauseButton.style.display = 'none';
  resetButton.style.display = 'none';

  isReset = true;
  isPaused = false;
});

