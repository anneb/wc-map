import { LitElement, html, css } from 'lit';
import { APIkeys } from '../keys.js';

export class WebMap extends LitElement {
  static keys = APIkeys;
  static get styles() {
    return css`
      :host {
        display: block;
        width: 400px;
        height: 400px;
      }
      #map {
        width: 100%;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <style>#map { padding: 4px; }</style>
      <div id="map">
        Please use one of the specific web-map components:
        <ol>
          <li>&lt;web-map-leaflet&gt;</li>
          <li>&lt;web-mapbox-gl&gt;</li>
          <li>&lt;web-maplibre-gl&gt;</li>
          <li>&lt;web-map-openlayers&gt;</li>
        </ol>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.status = 'web-map ready';
  }
}

customElements.define('web-map', WebMap);