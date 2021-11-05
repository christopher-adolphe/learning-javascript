const stopAnalyticsBtn = document.getElementById('stop-analytics-btn');
const intervalId = setInterval(
  () => {
    // eslint-disable-next-line no-console
    console.log('Sending analytics data...');
  },
  // eslint-disable-next-line no-magic-numbers
  2000
);

stopAnalyticsBtn.addEventListener(
  'click',
  () => {
    clearInterval(intervalId);
  }
);
