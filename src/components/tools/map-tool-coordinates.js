import { LitElement, html } from "lit";
import { WebMap } from "../maps/web-map";

/**
  * @prop {String} for - The selector for the map to listen to
  * @attr lat - The latitude of the mouse position, set by the map
  * @attr lng - The longitude of the mouse position, set by the map
*/
export class MapToolCoordinates extends LitElement {
  static get properties() {
    return {
      for: { type: String },
      lat: { type: Number, reflect: true},
      lng: { type: Number, reflect: true}
    }
  }
  constructor() {
    super();
    this.for = '';
    this.lat = this.lng = null;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.for) {
      for (let parentNode = this.parentNode; parentNode; parentNode = parentNode.parentNode) {      
        if (parentNode instanceof WebMap) {
          this.el = parentNode;
          break;
        }
      }
    }
    if (this.el) {
      this.el.addEventListener('map-mousemove', this._boundMouseMovedOnMap);
    }
  }
  shouldUpdate(changedProperties) {
    if (changedProperties.has('for')) {
      if (this.for && this.el) {
        this.el.removeEventListener('map-mousemove', this._boundMouseMovedOnMap);
      }
      if (this.for) {
        this.el = this.getRootNode().querySelector(this.for);
        if (this.el) {
          this.el.addEventListener('map-mousemove', this._boundMouseMovedOnMap);
        }
      }
    }
    return true;
  }
  render() {    
    if (this.lat === null) {
      return html`<div>Move the mouse over the map</div>`;
    }
    return html`Latitude: ${this.lat}, Longitude: ${this.lng}`;        
  }
  _mouseMovedOnMap(e) {
    this.lat = e.detail.lat;
    this.lng = e.detail.lng;
  }
  _boundMouseMovedOnMap = (e) => this._mouseMovedOnMap(e);

}

customElements.define('map-tool-coordinates', MapToolCoordinates);