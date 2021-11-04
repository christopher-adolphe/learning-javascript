import { DOMHelper, doSomethingElse } from '../utility/dom-helper.js';
import { ProjectItem } from './project-item.js';

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    
    projectItems.forEach(item => this.projects.push(
      new ProjectItem(item.id, this.switchProject.bind(this))
    ));

    this.connectDroppable();

    doSomethingElse();
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
