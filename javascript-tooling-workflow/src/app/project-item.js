import { DOMHelper, doSomething } from '../utility/dom-helper.js';
// tooltip is a static import meaning it is downloaded right away
// when project-item.js is interpreted by the browser. For better
// performance we can also use dynamic imports
// import { Tooltip } from './tooltip.js';

export class ProjectItem {
  // hasActiveTooltip = false;

  constructor(itemId, switchProjectFn) {
    this.id = itemId;
    this.switchProjectHanlder = switchProjectFn;
    this.hasActiveTooltip = false;
    this.connectSwitchBtn();
    this.connectInfoBtn();
    this.connectDrag();

    doSomething();
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

    // const tooltip = new Tooltip(tooltipInfo, this.closeTooltipNotifier.bind(this), this.id);

    // tooltip.attach();

    // using the 'import()' function to create a dynamic import for the Tooltip class
    import('./tooltip.js').then((module) => {
      const tooltip = new module.Tooltip(
        tooltipInfo,
        this.closeTooltipNotifier.bind(this),
        this.id
      );

      tooltip.attach();
    });

    this.hasActiveTooltip = true;

    // eslint-disable-next-line capitalized-comments
    // App.startAnalytics();
  }

  connectSwitchBtn() {
    const projectItem = document.getElementById(this.id);
    let itemBtn = projectItem.querySelector('button:last-of-type');

    itemBtn = DOMHelper.clearEventListeners(itemBtn);

    itemBtn.addEventListener(
      'click',
      this.switchProjectHanlder.bind(
        null,
        this.id
      )
    );
  }

  connectInfoBtn() {
    const projectItem = document.getElementById(this.id);
    const infoBtn = projectItem.querySelector('button:first-of-type');

    infoBtn.addEventListener(
      'click',
      this.infoHandler.bind(this)
    );
  }

  connectDrag() {
    const projectItem = document.getElementById(this.id);

    projectItem.addEventListener(
      'dragstart',
      (event) => {
        event.dataTransfer.setData(
          'text/plain',
          this.id
        );
        event.dataTransfer.effectAllowed = 'move';
      }
    );

    projectItem.addEventListener(
      'dragend',
      (event) => {
        if (event.dataTransfer.dropEffect === 'none') {
          // eslint-disable-next-line no-alert
          alert('Sorry, project was not drop in a droppable zone!! Please try again');
        }
      }
    );
  }

  updateItem(switchProjectFn, type, updatedProject) {
    this.switchProjectHanlder = switchProjectFn;
    this.connectSwitchBtn();

    const itemBtn = document.querySelector(`#${updatedProject.id} button:last-of-type`);

    itemBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
  }
}
