import { html, css } from 'lit-element';
import { MapToolBase } from "./map-tool-base";
import { MapToolBoundingboxAPIFactory } from '../../factories/map-tool-boudingbox-api-factory';

/**
  * @prop {String} for - The selector for the map to listen to
  * @attr lat - The latitude of the mouse position, set by the map
  * @attr lng - The longitude of the mouse position, set by the map
*/
export class MapToolBoundingBox extends MapToolBase {
  static styles = [
      css`
      .scale-down {
        font-size: 80%;
      }`
  ]

  static get properties() {
    return {
      ...MapToolBase.properties,
      east: { type: Number, reflect: true},
      west: { type: Number, reflect: true},
      north: { type: Number, reflect: true},
      south: { type: Number, reflect: true}
    }
  }

  constructor() {
    super();
    this.lat = this.lng = null;
    this.markers = [];
  }

  connectedCallback() {
    super.connectedCallback();    
    if (this.webMapElement && !this.disabled) {
      this.activate();
    }
  }

  disconnectedCallback() {
    if (this.webMapElement && !this.disabled) {
      this.deactivate();
    }
    super.disconnectedCallback();
  }

  render() {
    if (this.disabled) {
      return html``;
    }
    if (!this.webMapElement) {
      return html`<div>${this.constructor.name}: No map element found</div>`;
    }
    if (this.east === null && this.west === null) {
      return html`<div>Click to define bbox</div>`;
    }
    if (this.east === null || this.west === null) {
      return html`<div>click to finish bbox</div>`;
    }
  }

  activate() {
    if (!this.isActivated) {
      super.activate();
      this.east = this.west = this.north = this.south = null;
      this.webMapAPI = MapToolBoundingboxAPIFactory.getAPI(this.webMapElement);
      this.webMapElement.addEventListener('map-mouseclick', this._boundClickOnMap);
      this.webMapElement.addEventListener('map-mousemove', this._boundMouseMoveOnMap);
      this.isActivated = true;
    }
  }
  deactivate() {
    if (this.isActivated) {
      super.deactivate();
      this.east = this.west = this.north = this.south = null;
      this.webMapElement.removeEventListener('map-mouseclick', this._boundClickOnMap);
      this.webMapElement.removeEventListener('map-mousemove', this._boundMouseMoveOnMap);
      this.isActivated = false;
    }
  }
  clickMap(e) {
    if (this.markers.length < 2) {
      const marker = this.webMapAPI.addMarker(e.detail.lng, e.detail.lat);
      this.markers.push(marker);
    }
    if (this.east === null && this.west === null) {
      this.east = e.detail.lng;
    } else {
      this.east = Math.max(this.east, e.detail.lng);
      this.west = Math.min(this.west, e.detail.lng);
    }
    if (this.north === null && this.south === null) {
      this.north = e.detail.lat;
    } else {
      this.north = Math.max(this.north, e.detail.lat);
      this.south = Math.min(this.south, e.detail.lat);
    }
  }
  moveOnMap(e) {
    if (this.east !== null && this.west !== null) {
      return; // nothing to update
    }
  }
  _boundClickOnMap = (e) => this.clickMap(e);
  _boundMouseMoveOnMap = (e) => this.moveOnMap(e);
}

customElements.define('map-tool-boundingbox', MapToolBoundingBox);