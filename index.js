let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsDisplay = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        lapButton.disabled = false;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    timeDisplay.innerHTML = "00:00:00.000";
    lapsDisplay.innerHTML = '';
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    lapCount++;
    const lapTime = formatTime(difference);
    const lapEntry = document.createElement('div');
    lapEntry.innerHTML = 'Lap ${lapCount} : ${lapTime}';
    lapsDisplay.appendChild(lapEntry);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    timeDisplay.innerHTML = formatTime(difference);
}

function formatTime(difference) {
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? "0" + (milliseconds < 10 ? "0" + milliseconds : milliseconds) : milliseconds)
    );
}