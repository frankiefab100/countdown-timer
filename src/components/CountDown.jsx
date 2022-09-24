import React, { useState, useEffect } from "react";

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

const CountDown = () => {
  const [secondsTime, setSecondsTime] = useState(0);
  const [minutesTime, setMinutesTime] = useState(0);
  const [hoursTime, setHoursTime] = useState(0);
  const [daysTime, setDaysTime] = useState(0);

  const [countdownTitle, setCountdownTitle] = useState("");
  const [countdownDate, setCountdownDate] = useState("");
  const [timeDifferences, setTimeDifferences] = useState(100);

  const countdownElem = document.querySelector("#countdown");
  const formElem = document.querySelector("#input-container");
  const completedCount = document.querySelector("#completed-countdown");

  let specifiedTime;
  const minDate = new Date().toISOString().split("T")[0];

  // specifiedTime = new Date("December 30, 2022 00:00:00").getTime();
  // specifiedTime = new Date(countdownDate);
  // const presentTime = new Date().getTime();

  // console.log(presentTime);

  // useEffect(() => {
  //   setTimeDifferences(specifiedTime - presentTime);
  // }, []);

  // console.log(timeDifferences);

  const setCountdown = () => {
    console.log("setcoundown is running");

    console.log(timeDifferences);

    setSecondsTime(Math.floor((timeDifferences % minutes) / seconds));
    setMinutesTime(Math.floor((timeDifferences % hours) / minutes));
    setHoursTime(Math.floor((timeDifferences % days) / hours));
    setDaysTime(Math.floor(timeDifferences / days));

    console.log(secondsTime, minutesTime, hoursTime, daysTime);

    //  If the countdown has ended, show completed
    if (timeDifferences < 0) {
      countdown.hidden = true;
      // clearInterval(setCountdown);
      CompletedCountdown.hidden = false;
    }
  };

  useEffect(() => {
    console.log("timediff", timeDifferences);
  }, [timeDifferences]);

  const updateCountdown = (e) => {
    e.preventDefault();

    if (countdownDate === "") {
      alert("Please select an accurate date");
    } else {
      specifiedTime = new Date(countdownDate).getTime();
      const presentTime = new Date().getTime();

      // console.log(specifiedTime - presentTime);
      setTimeDifferences((specifiedTime - presentTime) / seconds);
      // console.log(specifiedTime);
      // setCountdown();
      setInterval(setCountdown, 1000);

      if (timeDifferences < 0) {
        clearInterval(interval);
      }
    }
  };

  const resetCountdown = () => {
    // Hide countdown, show Input
    countdownElem.hidden = true;
    completedCount.hidden = true;
    formElem.hidden = false;

    // Stop countdown
    clearInterval(setCountdown);

    // Reset values
    setCountdownTitle("");
    setCountdownDate("");
    // localStorage.removeItem("countdownDetails");
  };

  return (
    <div className="container">
      <div id="input-container" className="input-container">
        <h1>Set Countdown Timer</h1>
        <form
          onSubmit={(e) => updateCountdown(e)}
          // className={`countdown-form ${!resetCountdown && "hidden"}`}
          className="countdown-form"
        >
          <label htmlFor="title">Event Name</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Countdown Name"
            value={countdownTitle}
            onChange={(e) => setCountdownTitle(e.target.value)}

            // onChange={handleTitle}
          />

          <label htmlFor="date-picker">Select Date</label>
          <input
            type="date"
            name="date-picker"
            id="date-picker"
            min={minDate}
            placeholder="Select Countdown Day"
            value={countdownDate}
            onChange={(e) => setCountdownDate(e.target.value)}
            // onChange={handleDate}
          />

          <button onClick={(e) => updateCountdown(e)} type="submit">
            Set Countdown
          </button>
        </form>
      </div>

      <div hidden className="countdown" id="countdown">
        <h1 id="countdown-title">{countdownTitle}</h1>

        <div className="timer">
          <div className="date">
            <p className="days">
              {daysTime < 10 ? "0" : ""}
              {daysTime}
            </p>
            <h3>Days</h3>
          </div>

          <div className="date">
            <p className="hours">
              {hoursTime < 10 ? "0" : ""}
              {hoursTime}
            </p>
            <h3>Hours</h3>
          </div>

          <div className="date">
            <p className="minutes">
              {minutesTime < 10 ? "0" : ""}
              {minutesTime}
            </p>
            <h3>Minutes</h3>
          </div>

          <div className="date">
            <p className="seconds">
              {secondsTime < 10 ? "0" : ""}
              {secondsTime}
            </p>
            <h3>Seconds</h3>
          </div>
        </div>

        <button onClick={resetCountdown} className="reset-btn">
          Reset Countdown
        </button>
      </div>

      <div hidden className="completed-countdown" id="completed-countdown">
        <h1 className="complete-title">{countdownTitle}</h1>
        <p className="complete-details">
          {countdownTitle} completed succesfully on {countdownDate}
        </p>

        <button onClick={resetCountdown} id="start-new">
          New Countdown
        </button>
      </div>
    </div>
  );
};

export default CountDown;
