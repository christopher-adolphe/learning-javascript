// Building an autonomous custom element
class Tooltip extends HTMLElement {
  // Creating a getter for the `observedAttributes` property to set a list
  // of attributes we wish to observe on the custom component
  static get observedAttributes() {
    return ['content'];
  }

  // Element created
  constructor() {
    super();

    console.log('Tooltip Web Component Created.');

    // Defining a private property to act as container for the
    // tooltip custom element. We are using an underscore at the 
    // beginning of the property name as a convention to mark it 
    // as a private property meaning that it should not be
    // accessed/used outside the class
    this._tooltipContainer;

    this._tooltipIcon;

    // Defining a property to store the tooltip text content and
    // initializing it a default value
    this._tooltipContent = 'Your tooltip text goes here!!';


    // Using the `attachShadow()` method to unlock the shadowDOM
    // thus allowing encapsulation of styles as the custom element
    // has it's own shadowDOM tree attached to it
    // NOTE: Any element that should be appended or removed within
    // the custom element should now be done via the `shadowRoot`
    this.attachShadow({ mode: 'open' });

    // Accessing the tooltip template element in the DOM
    // const template = document.getElementById('tooltip-tpl');
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Using the innerHTML property to creating the template within the class
    // Setting the innerHTML property inside the class also allows to add
    // scoped style to the custom element

    // Using the :host selector to apply styles to the custom component

    // Using the :host-context selector to apply styles to the custom component
    // under specific usage context, e.g: here the font weight will be bold only
    // when the custom component is nested inside a parent element having .danger
    // class

    // Using the ::slotted selector to apply styles to content projected
    // inside the custom component
    this.shadowRoot.innerHTML = `
      <style>
        div {
          position: absolute;
          top: 0px;
          left: 100%;
          width: 400px;
          max-width: 400px;
          padding: 0.5rem;
          background-color: #8e44ad;
          color: #ecf0f1;
          border-radius: 4px;
          z-index: 10;
        }

        :host {
          position: relative;
        }

        :host(.warning) {
          background-color: var(--warning-color, #2980b9);
        }

        :host-context(.danger) {
          font-weight: bold;
        }

        ::slotted(.highlight) {
          border-bottom: 2px dashed var(--highlight-border-color);
        }
      </style>
      <slot>Default tooltip slot</slot><span> (?)</span>
    `;
  }

  // Using the `connectedCallback()` lifecycle hook
  // to start DOM initialization. This hook allows
  // us to access/add elements in the DOM
  connectedCallback() {
    this._tooltipIcon = this.shadowRoot.querySelector('span');

    // Checking if the `content` attribute has been set on the
    // custom element to override the default value of the
    // `this._tooltipContent` property
    if (this.hasAttribute('content')) {
      this._tooltipContent = this.getAttribute('content');
    }

    this._tooltipIcon.textContent = ' (?)';
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    // Applying some basic styles to the custom element
    // this.style.position = 'relative';

    this.shadowRoot.appendChild(this._tooltipIcon);
  }

  // Using the `disconnectedCallback()` lifecycle hook
  // to do cleanup work when the element is detached
  // from the DOM
  disconnectedCallback() {
    console.log('disconnectedCallback called');

    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  // Using the `attributeChangedCallback()` lifecycle hook
  // to observe changes on attribute so that we can update
  // data or DOM elements within the custom element. It takes
  // 3 arguments; 1st the name of the attribute to observe, 
  // 2nd the old value of the observed attribute and 3rd the
  // new value of the observed attribute
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback: ', { name, oldValue, newValue });

    // Checking if the value of the attribute has changed
    if (newValue === oldValue) {
      return;
    }

    // Checking which attribute has changed in case we are
    // observing multiple attributes
    if (name === 'content') {
      this._tooltipContent = newValue;
    }
  }

  // Creating a `showTooltip()` method that will handle the
  // display of the tooltip on mouse enter event. We are using
  // an underscore at the beginning of the method name as a
  // convention to mark it as a private method meaning that it
  // should not be accessed/used outside the class 
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');

    this._tooltipContainer.textContent = this._tooltipContent;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

// Using the `define()` method of the customElements
// object to register our custom element and define
// our custom HTML tag. The `define()` method take 2
// arguments; the 1st argument is a string which will
// be used as the HTML tag, the 2nd argument is the
// class that will be used to instantiate an object
// for our custom element
customElements.define('app-tooltip', Tooltip)
