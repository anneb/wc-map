import { LitElement, html, css } from 'lit';
import { APIkeys } from '../../keys.js';
import { fetchJson, fetchSource } from '../../utils/fetchdata.js';

const NEWEVENT = 1;
const REGISTEREDEVENT = 2;

export class WebMap extends LitElement {
  static keys = APIkeys;
  static properties = {
    lat: { type: Number },
    lon: { type: Number },
    zoom: { type: Number },
    pitch: { type: Number },
    bearing: { type: Number },
    mapStyle: { type: String, attribute: 'map-style' },
    mapLayers: { type: String, attribute: 'map-layers'},
  }
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
  constructor() {
    super();
    this.map = null;
    this.lat = this.lon = this.zoom = this.pitch = this.bearing = 0;
    this.eventTypes = {}; // the events to listen for
  }
  shouldUpdate(changedProperties) {
    if (changedProperties.has('mapLayers') || changedProperties.has('mapStyle')) {
      this.loadLayersAndStyles();      
    }
    if (changedProperties.has('lat') || changedProperties.has('lon') || changedProperties.has('zoom') || changedProperties.has('pitch') || changedProperties.has('bearing')) {
      this.nativeUpdateView();
    }
    return true;
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
    // derived classes should set this.map when the map is ready
  }
  addEventListener (event, listener, options) {
    console.log('add event listener for ' + event);
    super.addEventListener(event, listener, options);
    if (!this.eventTypes[event]) {
      this.eventTypes[event] = NEWEVENT;
      this.addEventListeners()
    }
  }
  loadLayersAndStyles() {
    if (!this.fetchingLayersAndStyles) {
      this.fetchingLayersAndStyles = true; 
      if ((this.mapLayers && !this.mapLayersArray) || (this.mapStyle && !this.mapStyleObject)) {
        Promise.all([fetchJson(this.mapLayers), fetchJson(this.mapStyle)]).then(([mapLayers, mapStyle]) => {
          if (mapLayers && !Array.isArray(mapLayers)) {
            mapLayers = [mapLayers];
          }
          this.mapLayersArray = mapLayers;
          this.mapStyleObject = mapStyle;      
          this.updateStyle();
          this.updateLayers();
          this.fetchingLayersAndStyles = false;
        });
      } else {
        this.updateStyle();
        this.updateLayers();
        this.fetchingLayersAndStyles = false;
      }
    }
  }
  async updateLayers() {
    if (this.map && this.mapLayersArray) {
      for (const layer of this.mapLayersArray) {
        await fetchSource(layer);
        this.nativeAddLayer(layer);
      };
    }
  }
  updateStyle() {
  }
  addEventListeners () {
    if (this.map) {
      for (const event in this.eventTypes) {
        if (this.eventTypes[event] === NEWEVENT) {
          this.nativeActivateEventListener(event);
          this.eventTypes[event] = REGISTEREDEVENT;
        }
      }
    }
  }
  warnNotImplemented(functionName) {
    if (this.constructor.name !== 'WebMap') {
      console.warn(`${functionName} not yet implemented for ${this.constructor.name}`);
    }
  }
  nativeUpdateView() {
    this.warnNotImplemented('nativeUpdateView');
  }
  nativeActivateEventListener(event) {
    this.warnNotImplemented('nativeActivateEventListener');
  }
  nativeAddLayer(layer) {
    this.warnNotImplemented('nativeAddLayer');
  }
  mapReady(e) {
    this.nativeUpdateView();
    this.addEventListeners();
    this.loadLayersAndStyles();
    this.dispatchEvent(new CustomEvent('map-ready'));
  }
}

customElements.define('web-map', WebMap);