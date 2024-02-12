let year = document.getElementById("year");
let month = document.getElementById("month");
let days = document.getElementById("days");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

function handleSubmit() {
  let inputdays = document.getElementById("inputdays").value;
  let inputmonth = document.getElementById("inputmonth").value;
  let inputyear = document.getElementById("inputyear").value;
  let age = calculateAge(inputyear, inputmonth, inputdays);
  year.innerHTML = age.years;
  month.innerHTML = age.months;
  days.innerHTML = age.days;
  minutes.innerHTML = age.minutes;
  seconds.innerHTML = age.seconds;
  document.getElementById("ageinseconds").innerHTML = age.ageseconds;
}

function calculateAge(year, month, day) {
  var currentDate = new Date();
  var birthDate = new Date(year, month - 1, day); // Note: months are 0-based

  var ageInMilliseconds = currentDate - birthDate;
  var ageInSeconds = ageInMilliseconds / 1000;
  var ageInMinutes = ageInSeconds / 60;
  var ageInHours = ageInMinutes / 60;
  var ageInDays = ageInHours / 24;

  // Calculate years
  var ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  var birthMonth = birthDate.getMonth();
  var currentMonth = currentDate.getMonth();
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())
  ) {
    ageYears--;
  }

  // Calculate months
  var ageMonths = currentDate.getMonth() + 12 - birthDate.getMonth();
  if (currentDate.getDate() < birthDate.getDate()) {
    ageMonths--;
  }

  // Calculate remaining days
  var tempDate = new Date(birthDate);
  tempDate.setFullYear(tempDate.getFullYear() + ageYears);
  tempDate.setMonth(tempDate.getMonth() + ageMonths);
  var ageDays = Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
  ageDays = ageDays + 1;

  // Calculate remaining hours, minutes, and seconds
  var remainingSHours = ageInHours - ageDays * 24;
  var remainingHours = currentDate.getHours() - birthDate.getHours();
  var ageHours = Math.floor(remainingHours);
  var ageHourss = Math.floor(remainingSHours);
  var remainingMinutes = (remainingSHours - ageHourss) * 60;
  var ageMinutes = Math.floor(remainingMinutes);
  var remainingSeconds = (remainingMinutes - ageMinutes) * 60;
  var ageSeconds = Math.floor(remainingSeconds);
  let ages = {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
    ageseconds: Math.floor(ageInSeconds),
    hours: ageHours,
    minutes: ageMinutes,
    seconds: ageSeconds,
  };
  ages.seconds++;
  if (ages.seconds === 60) {
    ages.seconds = 0;
    ages.minutes++;
  }
  setInterval(handleSubmit, 1000);
  // Implement similar logic for other time units like minutes, hours, etc.

  return ages;
}

// Example usage
var userYear = 2009;
var userMonth = 7;
var userDay = 9;
