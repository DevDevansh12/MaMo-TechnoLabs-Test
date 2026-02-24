// ======= Coming Soon Countdown =======
const countdownInit = () => {

  

  const x = setInterval(function () {

    const now = new Date().getTime();
      
    const distance = launchDate - now;
      
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    if (daysEl) {
      daysEl.innerText = days;
    }
    if (hoursEl) {
      hoursEl.innerText = hours;
    }
    if (minutesEl) {
      minutesEl.innerText = minutes;
    }
    if (secondsEl) {
      secondsEl.innerText = seconds;
    }
      
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".countdown").innerText = "Launched!";
    }
  }, 1000);
};
document.addEventListener('DOMContentLoaded', countdownInit);

