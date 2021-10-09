class DOMHelper {
  static moveElement(elemId, destinationSelector) {
    const elem = document.getElementById(elemId);
    const destinationElem = document.querySelector(destinationSelector);

    destinationElem.append(elem);
    elem.scrollIntoView({ behavior: 'smooth' });
  }

  static clearEventListeners(elem) {
    const clonedElem = elem.cloneNode(true);

    elem.replaceWith(clonedElem);

    return clonedElem;
  }
}

class Component {
  constructor(hostElemId, insertBefore = false) {
    if (hostElemId) {
      this.hostElem = document.getElementById(hostElemId);
    } else {
      this.hostElem = document.body;
    }

    this.insertBefore = insertBefore;
  }

  attach() {
    // document.body.append(this.elem);
    this.hostElem.insertAdjacentElement(this.insertBefore ? 'beforebegin' : 'beforeend', this.elem);
  }

  remove() {
    this.elem.remove();
  }
}

class Tooltip extends Component {
  constructor(tooltipText, tooltipCloseNotifierFn, hostElemId) {
    super(hostElemId);
    this.closeTooltipHandler = tooltipCloseNotifierFn;
    this.create(tooltipText);
  }

  create(tooltipText) {
    const tooltipElem = document.createElement('div');
    const tooltilTemplateElem = document.getElementById('tooltipTemplate');
    // Importing the content from the template element
    const tooltipContent = document.importNode(tooltilTemplateElem.content, true);
    const hostElemTopPos = this.hostElem.offsetTop;
    const hostElemLeftPos = this.hostElem.offsetLeft;
    const hostElemHeight = this.hostElem.clientHeight;
    const parentScrollTop = this.hostElem.parentElement.scrollTop;

    const tooltipTopPos = hostElemTopPos + hostElemHeight - parentScrollTop - 10;
    const tooltipLeftPos = hostElemLeftPos + 20;

    tooltipElem.style.position = 'absolute';
    tooltipElem.style.top = `${tooltipTopPos}px`;
    tooltipElem.style.left = `${tooltipLeftPos}px`;
    tooltipElem.className = 'card';
    // tooltipElem.textContent = tooltipText;
    tooltipContent.querySelector('p').textContent = tooltipText;
    tooltipElem.append(tooltipContent);
    tooltipElem.addEventListener('click', this.closeTooltip.bind(this));

    this.elem = tooltipElem;

    document.body.append(tooltipElem);
  }

  detach() {
    this.elem.remove();
    // this.elem.parentElement.removeChild(this.elem);
  }

  closeTooltip() {
    this.detach();
    this.closeTooltipHandler();
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(itemId, switchProjectFn) {
    this.id = itemId;
    this.switchProjectHanlder = switchProjectFn;
    this.connectSwitchBtn();
    this.connectInfoBtn();
    this.connectDrag();
  }

  closeTooltipNotifier() {
    this.hasActiveTooltip = false;
  }

  infoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }

    const projectItem = document.getElementById(this.id);
    const tooltipInfo = projectItem.dataset.extraInfo;
    const tooltip = new Tooltip(tooltipInfo, this.closeTooltipNotifier.bind(this), this.id);

    tooltip.attach();
    this.hasActiveTooltip = true;

    // App.startAnalytics();
  }

  connectSwitchBtn() {
    const projectItem = document.getElementById(this.id);
    let itemBtn = projectItem.querySelector('button:last-of-type');

    itemBtn = DOMHelper.clearEventListeners(itemBtn);

    itemBtn.addEventListener('click', this.switchProjectHanlder.bind(null, this.id));
  }

  connectInfoBtn() {
    const projectItem = document.getElementById(this.id);
    const infoBtn = projectItem.querySelector('button:first-of-type');

    infoBtn.addEventListener('click', this.infoHandler.bind(this));
  }

  connectDrag() {
    const projectItem = document.getElementById(this.id);

    projectItem.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    projectItem.addEventListener('dragend', event => {
      if (event.dataTransfer.dropEffect === 'none') {
        alert('Sorry, project was not drop in a droppable zone!! Please try again')
      }
    });
  }

  updateItem(switchProjectFn, type, updatedProject) {
    this.switchProjectHanlder = switchProjectFn;
    this.connectSwitchBtn();

    const itemBtn = document.querySelector(`#${updatedProject.id} button:last-of-type`);

    itemBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    
    projectItems.forEach(item => this.projects.push(
      new ProjectItem(item.id, this.switchProject.bind(this))
    ));

    this.connectDroppable();
  }

  setSwitchHandler(switchHandlerFn) {
    this.switchHandler = switchHandlerFn;
  }

  addProject(project) {
    this.projects.push(project);

    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);

    project.updateItem(this.switchProject.bind(this), this.type, project);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find(project => project.id === projectId));
    this.projects = this.projects.filter(project => project.id !== projectId);
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);


    list.addEventListener('dragenter', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', event => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', event => {
      const projectId = event.dataTransfer.getData('text/plain');

      // Check if project was dropped in the list it was already
      if (this.projects.find(project => project.id === projectId)) {
        return;
      }

      // Trigger click on dragged project to make it switch to the next list
      document
        .getElementById(projectId)
        .querySelector('button:last-of-type')
        .click();

        list.parentElement.classList.remove('droppable');
    });
  }
}

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

    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);

    this.hasAnalyticsStarted = true;
  }
}

App.init();
