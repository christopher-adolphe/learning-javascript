import { ProjectList } from './app/project-list.js';

class App {
  hasAnalyticsStarted = false;

  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');

    activeProjectList.setSwitchHandler(finishedProjectList.addProject.bind(finishedProjectList));
    finishedProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList));

    // const timeOutId = setTimeout(this.startAnalytics, 3000);

    // const stopAnalyticsBtn = document.getElementById('stop-analytics-btn');

    // stopAnalyticsBtn.addEventListener('click', () => {
    //   clearTimeout(timeOutId);
    // });
  }

  static startAnalytics(args) {
    if (this.hasAnalyticsStarted) {
      return;
    }

    const analyticsScript = document.createElement('script');

    analyticsScript.src = 'assets/scripts/utility/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);

    this.hasAnalyticsStarted = true;
  }
}

App.init();
