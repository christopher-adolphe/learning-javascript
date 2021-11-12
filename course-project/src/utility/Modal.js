export class Modal {
  constructor(contentId, fallbackText) {
    this.modalTpl = document.getElementById('modal-template');
    this.modalContentTpl = document.getElementById(contentId);
    this.fallbackText = fallbackText;
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElems = document.importNode(this.modalTpl.content, true);
      const modalContentElem = document.importNode(this.modalContentTpl.content, true);
      this.backdropElem = modalElems.querySelector('.backdrop');
      this.modalElem = modalElems.querySelector('.modal');

      this.modalElem.appendChild(modalContentElem);
      
      document.body.insertAdjacentElement('afterbegin', this.modalElem);
      document.body.insertAdjacentElement('afterbegin', this.backdropElem);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElem) {
      document.body.removeChild(this.modalElem);
      document.body.removeChild(this.backdropElem);
      this.modalElem = null;
      this.backdropElem = null;
    }
  }
}
