// Building an extended built-in element
class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this._confirmHandler.bind(this));
  }

  _confirmHandler(event) {
    if (!confirm('Do you really want to leave this page ?')) {
      event.preventDefault();
    }
  }
}

customElements.define('app-confirm-link', ConfirmLink, { extends: 'a' });
