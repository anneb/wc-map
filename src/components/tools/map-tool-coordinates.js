import { html, css } from 'lit-element';
import { MapToolBase } from "./map-tool-base";

/**
  * @prop {String} for - The selector for the map to listen to
  * @attr lat - The latitude of the mouse position, set by the map
  * @attr lng - The longitude of the mouse position, set by the map
*/
export class MapToolCoordinates extends MapToolBase {
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
    if (this.webMapElement) {
      this.webMapElement.addEventListener('map-mousemove', this._boundMouseMovedOnMap);
    }
  }

  disconnectedCallback() {
    if (this.webMapElement) {
      this.webMapElement.removeEventListener('map-mousemove', this._boundMouseMovedOnMap);
    }
    super.disconnectedCallback();
  }

  render() {    
    if (this.lat === null) {
      return html`<div>Move the mouse over the map</div>`;
    }
    return html`<div class="scale-down">Latitude: ${this.lat}, Longitude: ${this.lng}</div>`;
  }

  _mouseMovedOnMap(e) {
    this.lat = e.detail.lat;
    this.lng = e.detail.lng;
  }
  _boundMouseMovedOnMap = (e) => this._mouseMovedOnMap(e);
}

customElements.define('map-tool-coordinates', MapToolCoordinates);