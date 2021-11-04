import { Component } from './component.js';

export class Tooltip extends Component {
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
