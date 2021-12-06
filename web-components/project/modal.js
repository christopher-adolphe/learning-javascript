class Modal extends HTMLElement {
  static get observedAttributes() {
    return ['opened'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host([opened]) #modal__backdrop,
        :host([opened]) #modal__container {
          opacity: 1;
          pointer-events: all;
        }

        #modal__backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(49, 49, 49, 0.75);
          z-index: 1050;
          opacity: 0;
          pointer-events: none;
        }

        #modal__container {
          position: fixed;
          top: 15vh;
          left: calc(50% - 300px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          max-width: 600px;
          min-height: 300px;
          background-color: #f8f9fa;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: 1055;
          opacity: 0;
          pointer-events: none;
        }

        #modal__header,
        #modal__body,
        #modal__footer {
          padding: 1rem;
        }

        #modal__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4e4e4;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        #modal__title {
          margin: 0;
          font-size: 1.5rem;
        }

        #modal__btn-close {
          padding: 0.5rem 0.75rem;
          border: 1px solid #e4e4e4;
          color: #313131;
          cursor: pointer;
        }

        #modal__body {
          flex: 1;
        }

        #modal__footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-top: 1px solid #e4e4e4;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        #modal__footer button {
          padding: 0.5rem 1rem;
          border: 1px solid #e4e4e4;
          color: #313131;
          cursor: pointer;
        }

        #modal__footer button:not(:last-child) {
          margin-right: 1rem;
        }
      </style>

      <div id="modal__backdrop"></div>

      <div id="modal__container">
        <header id="modal__header">
          <h1 id="modal__title">Modal title</h1>

          <button type="button" id="modal__btn-close">x</button>
        </header>

        <div id="modal__body">
          <slot></slot>
        </div>

        <footer id="modal__footer">
          <button type="button" id="modal__btn-cancel">Cancel</button>
          <button type="button" id="modal__btn-confirm">Confirm</button>
        </footer>
      </div>
    `;

    this._isOpen = false;
  }

  connectedCallback() {}

  disconnecedCallback() {}

  attributeChangedCallback(attrName, previousVal, newVal) {
    console.log('attributeChangedCallback - attrName: ', { attrName, previousVal, newVal });

    if (previousVal === newVal) {
      return;
    }

    if (attrName === 'opened') {
      this._isOpen = true;
    } else {
      this._isOpen = false;
    }

    console.log('attributeChangedCallback - _isOpen: ', this._isOpen);
  }
}

customElements.define('app-modal', Modal);
