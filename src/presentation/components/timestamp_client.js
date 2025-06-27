function updateTimes() {
  const date = new Date();
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const millisecond = date.getMilliseconds().toString().padStart(3, "0");
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timestamp_year.innerHTML !== year) {
    timestamp_year.innerHTML = year;
  }
  if (timestamp_month.innerHTML !== month) {
    timestamp_month.innerHTML = month;
  }
  if (timestamp_day.innerHTML !== day) {
    timestamp_day.innerHTML = day;
  }
  if (timestamp_hour.innerHTML !== hour) {
    timestamp_hour.innerHTML = hour;
  }
  if (timestamp_minute.innerHTML !== minute) {
    timestamp_minute.innerHTML = minute;
  }
  if (timestamp_second.innerHTML !== second) {
    timestamp_second.innerHTML = second;
  }
  if (timestamp_millisecond.innerHTML !== millisecond) {
    timestamp_millisecond.innerHTML = millisecond;
  }
  if (timestamp_timezone.innerHTML !== timezone) {
    timestamp_timezone.innerHTML = timezone;
  }
}

updateTimes();

const timerInterval = setInterval(() => {
  updateTimes();

  if (!timestamp_millisecond) {
    clearInterval(timerInterval);
  }
}, 100);
