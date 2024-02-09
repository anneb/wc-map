// map-app.js
import { LitElement, html, css } from 'lit';

import './web-map.js';
import './web-map-leaflet.js';
import './web-maplibre-gl.js';
import './web-mapbox-gl.js';
import './web-map-openlayers.js';

class MapApp extends LitElement {
  // create styles for this element
    static styles = css`
        :host {
            display: block;
            width: 400px;
            height: 400px;
            box-sizing: border-box;
        }
        web-map, web-map-leaflet, web-maplibre-gl, web-mapbox-gl, web-map-openlayers {
            display: block;
            width: 300px;
            height: 300px;
            border: 1px solid gray;
        }
        .app {
            display: flex;
            flex-direction: row;
            padding: 10px;
            gap: 10px;
            overflow-x: auto;
        }
        .app > * {
           flex-shrink: 0;
        }
    `;

  render() {
    return html`
      <div class="app">
        <web-map></web-map>
        <web-map-leaflet @map-mousemove="${(e)=>this.mouseMovedOnMap(e)}"></web-map-leaflet>
        <web-maplibre-gl></web-maplibre-gl>
        <web-mapbox-gl></web-mapbox-gl>
        <web-map-openlayers></web-map-openlayers>
      </div>
      <div class="output">output</div>
    `;
  }
  mouseMovedOnMap(e) {
    this.shadowRoot.querySelector('.output').textContent = `${e.detail.offsetX}, ${e.detail.offsetY} : ${e.detail.lat}, ${e.detail.lng}`;
  }
}

customElements.define('map-app', MapApp);