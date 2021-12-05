class InfoBox extends HTMLElement {
  constructor() {
    super();

    this._isInfoVisible = true;
    this._infoBoxButton;
    this._infoBoxParagraph;

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        p.is-hidden {
          display: none;
        }
      </style>

      <button type="button">Show</button>
      <p id="info-box">
        <slot>More infos!</slot>
      </p>
    `;
  }

  connectedCallback() {
    this._infoBoxButton = this.shadowRoot.querySelector('button');
    this._infoBoxParagraph = this.shadowRoot.querySelector('p');

    if (this.hasAttribute('is-hidden') && this.getAttribute('is-hidden') === 'true') {
      this._infoBoxButton.textContent = 'Show';
      this._infoBoxParagraph.classList.add('is-hidden');
      this._isInfoVisible = false;
    } else {
      this._infoBoxButton.textContent = 'Hide';
      this._isInfoVisible = true;
    }

    this._infoBoxButton.addEventListener('click', this._infoBoxHandler.bind(this));
  }

  _infoBoxHandler() {
    this._infoBoxButton.textContent = this._isInfoVisible ? 'Show' : 'Hide';
    this._infoBoxParagraph.classList.toggle('is-hidden');
    this._isInfoVisible = !this._isInfoVisible;
  }
}

customElements.define('app-info-box', InfoBox);
