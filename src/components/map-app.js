// map-app.js
import { LitElement, html, css } from 'lit';

import './maps/web-map.js';
import './maps/web-map-leaflet.js';
import './maps/web-maplibre-gl.js';
import './maps/web-mapbox-gl.js';
import './maps/web-map-openlayers.js';
import './tools/map-tool-coordinates.js';
import './internal/map-positioner.js';

class MapApp extends LitElement {
  // create styles for this element
    static styles = css`
        :host {
            display: block;
            width: 400px;
            height: 400px;
            box-sizing: border-box;
        }
        web-map, web-map-leaflet, web-maplibre-gl, web-mapbox-gl, web-map-openlayers, map-tool-positioner {
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
        div[slot="middle-center"] {
          background-color: lightgreen;
        }
        .
    `;

  render() {
    return html`
      <div class="app">
        <web-map></web-map>
        <web-map-leaflet map-layers="./layers/world.json" 
          lon="5.1" lat="52.2522" 
          zoom="5">
          <map-tool-coordinates slot="bottom-center"></map-tool-coordinates>
          <div slot="top-left">100</div>
          <div slot="top-left">2</div>
          <div slot="top-left">3</div>
          <div slot="top-left">4</div>
          <div slot="top-left">5</div>
          <div slot="top-left">6</div>
          <div slot="top-left">7</div>
          <div slot="top-left">8</div>
          <div slot="top-left">9</div>
          <div slot="top-left">10</div>
          <div slot="top-left">11</div>
          <div slot="top-left">12</div>
          <div slot="top-left">13</div>
          <div slot="top-left">14</div>
          <div slot="top-left">15</div>
          <span slot="top-left">aa</span>
          <div slot="middle-center">
            <div>center above</div>
            <div>center below</div>
          </div>
          <div slot="top-right">Legenda</div>
        </web-map-leaflet>
        <web-maplibre-gl></web-maplibre-gl>
        <web-mapbox-gl></web-mapbox-gl>
        <web-map-openlayers></web-map-openlayers>
      </div>
      <div class="output">output</div>
      <map-tool-coordinates for="web-map-leaflet"></map-tool-coordinates>
    `;
  }
  mouseMovedOnMap(e) {
    this.shadowRoot.querySelector('.output').textContent = `${e.detail.offsetX}, ${e.detail.offsetY} : ${e.detail.lat}, ${e.detail.lng}`;
  }
}

customElements.define('map-app', MapApp);