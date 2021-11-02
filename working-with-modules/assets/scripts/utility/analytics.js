const stopAnalyticsBtn = document.getElementById('stop-analytics-btn');
const intervalId = setInterval(() => {
  console.log('Sending analytics data...');
}, 2000);

stopAnalyticsBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});
