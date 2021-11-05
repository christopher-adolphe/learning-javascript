export class DOMHelper {
  static moveElement(elemId, destinationSelector) {
    const elem = document.getElementById(elemId);
    const destinationElem = document.querySelector(destinationSelector);

    destinationElem.append(elem);
    elem.scrollIntoView({ 'behavior': 'smooth' });
  }

  static clearEventListeners(elem) {
    const clonedElem = elem.cloneNode(true);

    elem.replaceWith(clonedElem);

    return clonedElem;
  }
}

// eslint-disable-next-line func-style
export function doSomething() {
  // eslint-disable-next-line no-console
  console.log('doSomething has been called');
}

// eslint-disable-next-line func-style
export function doSomethingElse() {
  // eslint-disable-next-line no-console
  console.log('doSomethingElse has been called');
}
