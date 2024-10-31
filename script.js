// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

function formatTime(time) {
  let milliseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    `${hours.toString().padStart(2, "0")}:` +
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}:` +
    `${milliseconds.toString().padStart(2, "0")}`
  );
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.getElementById("displayTime").innerText = formatTime(elapsedTime);
  }, 10);

  // Add active class for button colors
  document.getElementById("startBtn").classList.add("active");
  document.getElementById("pauseBtn").classList.add("active");
  document.getElementById("resetBtn").classList.add("active");
  document.getElementById("lapBtn").classList.add("active");

  document.getElementById("startBtn").disabled = true;
}

function pause() {
  clearInterval(timerInterval);
  document.getElementById("startBtn").disabled = false;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  document.getElementById("displayTime").innerText = "00:00:00:000";
  document.getElementById("lapTimes").innerHTML = "";
  document.getElementById("startBtn").disabled = false;
  lapCounter = 1;

  // Remove active class to reset button colors
  document.querySelectorAll('.buttons button').forEach(button => button.classList.remove("active"));
}

function lap() {
  if (elapsedTime > 0) {
    let lapTime = formatTime(elapsedTime);
    let lapElement = document.createElement("p");
    lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
    document.getElementById("lapTimes").appendChild(lapElement);
    lapCounter++;
  }
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
