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

        :host([opened]) #modal__container {
          top: 15vh;
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
          transition: all 0.3s ease-in-out;
        }

        #modal__container {
          position: fixed;
          top: 5vh;
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
          transition: all 0.3s ease-in-out;
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

        ::slotted(#modal__title) {
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
          <slot name="modal-title"></slot>

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

    this.isOpen = false;

    const slots = this.shadowRoot.querySelectorAll('slot');

    // Listening to slot content changes
    slots[1].addEventListener('slotchange', event => {
      console.dir(slots[1].assignedNodes());
    });

    const cancelBtnElem = this.shadowRoot.getElementById('modal__btn-cancel');
    const confirmBtnElem = this.shadowRoot.getElementById('modal__btn-confirm');

    cancelBtnElem.addEventListener('click', this._cancel.bind(this));
    confirmBtnElem.addEventListener('click', this._confirm.bind(this));
  }

  connectedCallback() {
    const backdropElem = this.shadowRoot.getElementById('modal__backdrop');
    const closeBtnElem = this.shadowRoot.getElementById('modal__btn-close');

    backdropElem.addEventListener('click', this._cancel.bind(this));
    closeBtnElem.addEventListener('click', this._cancel.bind(this));
  }

  disconnecedCallback() {}

  attributeChangedCallback(attrName, previousVal, newVal) {
    console.log('attributeChangedCallback - attrName: ', { attrName, previousVal, newVal });

    if (previousVal === newVal) {
      return;
    }

    if (this.hasAttribute('opened')) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }

    console.log('attributeChangedCallback - isOpen: ', this.isOpen);
  }

  // Creating a public `open()` method that can also be used to open
  // the modal from the external document where the web component is used
  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  close() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
      this.isOpen = false;
    }
  }

  _cancel(event) {
    // Creating a custom event to be dispatched when `_cancel()` is called
    // and passing an object as 2nd argument to configure it
    // NOTE: The configuration object, the `bubbles` property indicates that
    // the event can bubble up the shadow DOM and the `composed` property
    // indicates that this custom event can leave the shadow DOM and be listened
    // to in the light DOM
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });

    // Using the target to dispatch the custom event
    event.target.dispatchEvent(cancelEvent);

    this.close();
  }

  _confirm()  {
    const confirmEvent = new Event('confirm');

    // A shorter alternative to dispatch a custom event is to dispatch it using
    // the `dispatchEvent()` method on the web component itself. This way no
    // configuration is required when creating the custom event
    this.dispatchEvent(confirmEvent);

    this.close();
  }
}

customElements.define('app-modal', Modal);
