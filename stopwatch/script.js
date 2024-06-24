let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    showButton('STOP');
}

function stop() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    stop();
    elapsedTime = 0;
    print('00:00:00');
    laps.innerHTML = '';
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.innerText = lapTime;
    laps.appendChild(li);
}

function startStop() {
    if (!running) {
        start();
        running = true;
    } else {
        stop();
        running = false;
    }
}

function showButton(buttonKey) {
    if (buttonKey === 'START') {
        startStopBtn.textContent = 'Start';
    } else {
        startStopBtn.textContent = 'Stop';
    }
}
