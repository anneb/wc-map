import {LitElement, html, css} from 'lit';
import {MapLayerType} from '../types/map-layer-type'

export class MapLayer extends LitElement {
  layer: MapLayerType;

  static get properties() {
    return {
      layers: {type: Array},
    }
  }
  // Declare reactive properties
  constructor() {
      super();
      this.layer = null;
  }
  // Render the UI as a function of component state
  render() {
    return html`<slot></slot>`;
  }
  firstUpdated() {
    this.dispatchEvent(new CustomEvent('addlayer', {
        detail: this.layer,
        bubbles: true,
        composed: true
    }))
  }
}

customElements.define('map-layer', MapLayer);