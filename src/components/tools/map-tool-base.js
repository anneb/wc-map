import { LitElement, html, css } from "lit";
import { WebMap } from "../maps/web-map";

export class MapToolBase extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    for: { type: String, reflect: false },
    disabled: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.for = '';
    this.disabled = false;
    this.webMapElement = null;
    this.isModal = false;
  }

  render() {
    return html`<div>Base Map Tool for ${this.webMapElement?.constructor.name || 'unknown'}</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateWebMapElement();
  }

  updated(changedProperties) {
    if (changedProperties.has('for')) {
      this.updateWebMapElement();
    }
  }

  updateWebMapElement() {
    const newMapElement = this.getWebMapElement();
    if (newMapElement !== this.webMapElement) {
      this.webMapElement = newMapElement;
      this.requestUpdate();
    }
  }

  getWebMapElement() {
    if (this.for) {
      return this.getRootNode().querySelector(`#${this.for}`);
    } else {
      let element = this;
      while (element) {
        if (element instanceof WebMap) {
          return element;
        }
        element = element.parentElement || element.getRootNode()?.host;
      }
      console.error(`No WebMap element found for ${this.constructor.name}`);
      return null;
    }
  }

  activate() {
    console.log(`Activating ${this.constructor.name}`);
    this.disabled = false;
  }
  
  deactivate() {
    console.log(`Deactivating ${this.constructor.name}`);
    this.disabled = true;
  }
}

// Define the custom element if it has not been defined yet
// Redefinition may occur is this class is extended by another class
if (!customElements.get('map-tool-base')) {
  customElements.define('map-tool-base', MapToolBase);
}
