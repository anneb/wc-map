import { html, css } from 'lit-element';
import { MapToolBase } from "./map-tool-base.js";
import { MapToolBoundingboxHandlerFactory } from '../../factories/map-tool-boudingbox-handler-factory.js';

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
    let factor = 7;
    if (this.webMapElement.resolution > 0) {
      factor = -Math.round(Math.log10(this.webMapElement.resolution));
    }
    return html`Boundingbox<br>
      <button @click="${()=>this.resetBbox()}">Reset to current map extent</button><br>
      west: ${this.west?.toFixed(factor)}, south: ${this.south?.toFixed(factor)}, east: ${this.east?.toFixed(factor)}, north:  ${this.north?.toFixed(factor)}`
  }

  activate() {
    if (!this.isActivated) {
      super.activate();
      this.east = this.west = this.north = this.south = null;
      this.webMapElement.addEventListener('map-update-boundingbox', this._boundUpdateBoundingBox);
      this.bboxHandler = MapToolBoundingboxHandlerFactory.getHandler(this.webMapElement);
      this.bboxHandler.createBoundingBox({west: this.west, south: this.south, east: this.east, north: this.north});
      this.isActivated = true;
    }
  }
  resetBbox() {
    this.bboxHandler.deleteBoundingBox();
    this.bboxHandler.createBoundingBox();
  }
  deactivate() {
    if (this.isActivated) {
      super.deactivate();
      this.webMapElement.removeEventListener('map-update-boundingbox', this._boundUpdateBoundingBox);
      this.bboxHandler.deleteBoundingBox();
      this.east = this.west = this.north = this.south = null;
      this.isActivated = false;
    }
  }

  updateBoundingBox(e) {
    this.east = e.detail.east;
    this.west = e.detail.west;
    this.north = e.detail.north;
    this.south = e.detail.south;
  }
  _boundUpdateBoundingBox = (e) => this.updateBoundingBox(e)
}

customElements.define('map-tool-boundingbox', MapToolBoundingBox);