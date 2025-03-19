let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;

function updateDisplay() {
    const display = document.getElementById('display');
    const format = (num) => num.toString().padStart(2, '0');
    display.innerText = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startStopwatch() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    pauseStopwatch();
    seconds = minutes = hours = 0;
    updateDisplay();
    document.getElementById('laps').innerHTML = '';
}

function lapTime() {
    const laps = document.getElementById('laps');
    const lapItem = document.createElement('li');
    lapItem.innerText = document.getElementById('display').innerText;
    laps.appendChild(lapItem);
}

// Initialize display
updateDisplay();
