import { LitElement, html, css } from 'lit';
import { APIkeys } from '../../keys.js';
import { fetchJson, fetchSource } from '../../utils/fetchdata.js';

export class WebMap extends LitElement {

  static _keys = APIkeys;

  static get properties() {
    return {
      lat: { type: Number },
      lon: { type: Number },
      zoom: { type: Number },
      pitch: { type: Number },
      bearing: { type: Number },
      mapStyle: { type: String, attribute: 'map-style' },
      mapLayers: { type: String, attribute: 'map-layers'}
    };
  }

  // inherit below style in derived classes as:
  // static styles = [super.styles, css`...`];
  static styles = css`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    #map {
      position: absolute;
      width: 100%;
      height: 100%;
    };
  `;

  constructor() {
    super();
    this._map = null;
    this._maplibrary = null;
    this.lat = this.lon = this.zoom = this.pitch = this.bearing = 0;
    this.mapLayers = '';
    this.mapStyle = '';
    this.mapLayersArray = null;
    this.mapStyleObject = null;
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
  updated(changedProperties) {
    if (!this._map) {
      return;
    }
    console.log('updated', changedProperties.keys());
    if (changedProperties.has('mapLayers') || changedProperties.has('mapStyle')) {
      this._loadLayersAndStyles();      
    }
    if (changedProperties.has('lat') || changedProperties.has('lon') || changedProperties.has('zoom') || changedProperties.has('pitch') || changedProperties.has('bearing')) {
      this._updateView();
    }
    if (changedProperties.has('tool')) {
      
    }
  }
  connectedCallback() {
    super.connectedCallback();
    // derived classes should set this.map when the map is ready
  }
  async _loadLayersAndStyles() {
    console.log('loadLayersAndStyles');
    if (!this.fetchingLayersAndStyles) {
      this.fetchingLayersAndStyles = true; 
      if ((this.mapLayers && !this.mapLayersArray) || (this.mapStyle && !this.mapStyleObject)) {
        const [mapLayers, mapStyle] = await Promise.all([fetchJson(this.mapLayers), fetchJson(this.mapStyle)]);
        if (mapLayers && !Array.isArray(mapLayers)) {
          mapLayers = [mapLayers];
        }
        this.mapLayersArray = mapLayers;
        this.mapStyleObject = mapStyle;      
        this._updateStyle();
        this._updateLayers();
      } else {
        await this._updateStyle();
        await this._updateLayers();
      }
      this.fetchingLayersAndStyles = false;
    }
  }
  async _updateLayers() {
    console.log('updateLayers');
    if (this._map && this.mapLayersArray) {
      for (const layer of this.mapLayersArray) {
        await fetchSource(layer);
        this._addLayer(layer);
      };
    }
  }
  _updateStyle() {
  }
  _warnNotImplemented(functionName) {
    if (this.constructor.name !== 'WebMap') {
      console.warn(`${functionName} not yet implemented for ${this.constructor.name}`);
    }
  }
  async _updateView() {
    this._warnNotImplemented(`${this.constructor.name}._updateView`);
  }
  async _addLayer(layer) {
    this._warnNotImplemented(`${this.constructor.name}.addLayer`)
  }
  async _mapReady(e) {
    console.log('mapReady');
    await this._updateView();
    await this._loadLayersAndStyles();
    this.dispatchEvent(new CustomEvent('map-ready'));
  }
}

customElements.define('web-map', WebMap);