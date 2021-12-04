class Tooltip extends HTMLElement {
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

    // Defining a property to store the tooltip text content and
    // initializing it a default value
    this._tooltipContent = 'Your tooltip text goes here!!';

    // Using the `attachShadow()` method to unlock the shadowDOM
    // thus allowing encapsulation of styles as the custom element
    // has it's own shadowDOM tree attached to it
    // NOTE: Any element that should be appended or removed within
    // the custom element should now be done via the `shadowRoot`
    this.attachShadow({ mode: 'open' });
  }

  // Using the `connectedCallback()` lifecycle hook
  // to start DOM initialization. This hook allows
  // us to access element attached to the DOM
  connectedCallback() {
    const tooltipIcon = document.createElement('span');

    // Checking if the `content` attribute has been set on the
    // custom element to override the default value of the
    // `this._tooltipContent` property
    if (this.hasAttribute('content')) {
      this._tooltipContent = this.getAttribute('content');
    }

    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    // Applying some basic styles to the custom element
    this.style.position = 'relative';

    this.shadowRoot.appendChild(tooltipIcon);
  }

  // Using the `disconnectedCallback()` lifecycle hook
  // to do cleanup work when the element is detached
  // from the DOM

  // Using the `attributeChangedCallback()` lifecycle hook
  // to observe changes on attribute so that we can update
  // data or DOM elements within the custom element

  // Creating a `showTooltip()` method that will handle the
  // display of the tooltip on mouse enter event. We are using
  // an underscore at the beginning of the method name as a
  // convention to mark it as a private method meaning that it
  // should not be accessed/used outside the class 
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');

    this._tooltipContainer.textContent = this._tooltipContent;

    // Applying some basic styles to the tooltipContainer
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.top = '0px';
    this._tooltipContainer.style.left = '100%';
    this._tooltipContainer.style.width = '400px';
    this._tooltipContainer.style.maxWidth = '400px';
    this._tooltipContainer.style.padding = '0.5rem';
    this._tooltipContainer.style.backgroundColor ='#8e44ad';
    this._tooltipContainer.style.color = '#ecf0f1';
    this._tooltipContainer.style.borderRadius = '4px';
    this._tooltipContainer.style.zIndex = '10';

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
