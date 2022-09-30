const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdown-form");
const dateElement = document.querySelector("#date-picker");

const countdownElement = document.querySelector("#countdown");
const titleElement = document.querySelector("#countdown-title");
const resetButton = document.querySelector(".reset-btn");
const timeElements = document.querySelectorAll(".timer p");

const completedCountdown = document.querySelector("#complete");
const completedDetails = document.querySelector(".complete-details");
const newCountdownBtn = document.querySelector("#start-new");

let countdownTitle = "";
let countdownDate = "";

let specifiedTime = new Date();
let countdownActive;

// Save countdown title and date to Local Storage
let savedCountdownDetails;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// const today = new Date().toISOString().split("T")[0];

// dateElement.setAttribute("min", today);

function updateCountdown() {
  countdownActive = setInterval(() => {
    const presentTime = new Date().getTime();
    const timeDifference = specifiedTime - presentTime;
    console.log(timeDifference);

    const days = Math.floor(timeDifference / day);
    const hours = Math.floor((timeDifference % day) / hour);
    const minutes = Math.floor((timeDifference % hour) / minute);
    const seconds = Math.floor((timeDifference % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    //  If the countdown has ended, show completed
    if (timeDifference < 0) {
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completedDetails.textContent = `${countdownTitle} completed succesfully on ${countdownDate} `;
      completedCountdown.hidden = false;
    } else {
      // Populate countdown

      document.querySelector(".days").textContent = `${
        days < 10 ? "0" : ""
      }${days}`;
      document.querySelector(".hours").textContent = `${
        hours < 10 ? "0" : ""
      }${hours}`;
      document.querySelector(".minutes").textContent = `${
        minutes < 10 ? "0" : ""
      }${minutes}`;
      document.querySelector(".seconds").textContent = `${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      completedCountdown.hidden = true;
      // Show Countdown
      countdownElement.hidden = false;
    }
  }, second);
}

const updateCountdown = (e) => {
  e.preventDefault();

  document.querySelector("#countdown-title").value = countdownTitle;
  document.querySelector("#date-picker").value = countdownDate;

  savedCountdownDetails = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem(
    "countdownDetails",
    JSON.stringify(savedCountdownDetails)
  );

  if (countdownDate === "") {
    alert("Please select an accurate date");
  } else {
    specifiedTime = new Date(countdownDate).getTime();

    updateCountdown();
  }
};

const resetCountdown = () => {
  // Hide countdown, show Input
  countdownElement.hidden = true;
  completedCountdown.hidden = true;
  inputContainer.hidden = false;

  // Stop countdown
  clearInterval(countdownActive);

  // Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdownDetails");
};

// Get countdown from localstorage if available
function restoreExistingCountdown() {
  if (localStorage.getItem("countdownDetails")) {
    inputContainer.hidden = true;

    // Retrieve the string data as Object values
    savedCountdownDetails = JSON.parse(
      localStorage.getItem("countdownDetails")
    );

    countdownTitle = savedCountdownDetails.title;
    countdownDate = savedCountdownDetails.date;
    specifiedTime = new Date(countdownDate).getTime();
    updateCountdown();
  }
}

countdownForm.addEventListener("submit", updateCountdown);
resetButton.addEventListener("click", resetCountdown);
newCountdownBtn.addEventListener("click", resetCountdown);

// On load, check local storage
restoreExistingCountdown();
