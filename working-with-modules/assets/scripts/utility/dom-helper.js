export class DOMHelper {
  static moveElement(elemId, destinationSelector) {
    const elem = document.getElementById(elemId);
    const destinationElem = document.querySelector(destinationSelector);

    destinationElem.append(elem);
    elem.scrollIntoView({ behavior: 'smooth' });
  }

  static clearEventListeners(elem) {
    const clonedElem = elem.cloneNode(true);

    elem.replaceWith(clonedElem);

    return clonedElem;
  }
}

export function doSomething() {
  console.log('doSomething has been called');
}

export function doSomethingElse() {
  console.log('doSomethingElse has been called');
}
