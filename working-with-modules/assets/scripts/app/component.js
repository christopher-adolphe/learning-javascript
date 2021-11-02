// Using the 'export' keyword to indicate javascript that inside of a module
// we want to make this Component class available to other files as well.
// NOTE: When switching to modules, we have locked files meaning that their
// content will no more be available in the global scope, i.e each file will
// have its own scope
export class Component {
  constructor(hostElemId, insertBefore = false) {
    if (hostElemId) {
      this.hostElem = document.getElementById(hostElemId);
    } else {
      this.hostElem = document.body;
    }

    this.insertBefore = insertBefore;
  }

  attach() {
    // document.body.append(this.elem);
    this.hostElem.insertAdjacentElement(this.insertBefore ? 'beforebegin' : 'beforeend', this.elem);
  }

  remove() {
    this.elem.remove();
  }
}
