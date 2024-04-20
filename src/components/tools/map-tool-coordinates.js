import { html, css } from 'lit-element';
import { MapToolBase } from "./map-tool-base";

/**
  * @prop {String} for - The selector for the map to listen to
  * @attr lat - The latitude of the mouse position, set by the map
  * @attr lng - The longitude of the mouse position, set by the map
*/
export class MapToolCoordinates extends MapToolBase {
  #isActivated = false;
  static styles = [
      css`
      .scale-down {
        font-size: 80%;
      }`
  ]

  static get properties() {
    return {
      ...MapToolBase.properties,
      lat: { type: Number, reflect: true},
      lng: { type: Number, reflect: true}
    }
  }

  constructor() {
    super();
    this.lat = this.lng = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.disabled) {
      this.activate(); 
    } else {
      this.deactivate();
    }
  }

  disconnectedCallback() {
    this.deactivate();
    super.disconnectedCallback();
  }

  render() {
    if (this.disabled) {
      return html``;
    }
    if (!this.webMapElement) {
      return html`<div>${this.constructor.name}: No map element found</div>`;
    }
    if (this.lat === null) {
      return html`<div>Move the mouse over the map</div>`;
    }
    let factor = 7;
    if (this.webMapElement.resolution) {
      factor = -Math.round(Math.log10(this.webMapElement.resolution));
    }
    return html`<div class="scale-down">Latitude: ${this.lat?.toFixed(factor)}, Longitude: ${this.lng?.toFixed(factor)}</div>`;
  }

  _mouseMovedOnMap(e) {
    if (this.disabled) return;
    this.lat = e.detail.lat;
    this.lng = e.detail.lng;
  }
  activate() {
    if (!this.#isActivated) {
      this.#isActivated = true;
      super.activate();
      if (this.webMapElement) {
        this.webMapElement.addEventListener('map-mousemove', this._boundMouseMovedOnMap);
      }
    }
  }
  deactivate() {
    if (this.#isActivated) {
      this.#isActivated = false;
      super.deactivate();
      if (this.webMapElement) {
        this.webMapElement.removeEventListener('map-mousemove', this._boundMouseMovedOnMap);
      }
    }
  }
  _boundMouseMovedOnMap = (e) => this._mouseMovedOnMap(e);
}

customElements.define('map-tool-coordinates', MapToolCoordinates);