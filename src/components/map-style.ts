import {LitElement, html, css} from 'lit';

export class MapStyle extends LitElement {
  layers:Array<string>;

  static get styles() {
      return css`:host {display: none}`
  }

  static get properties() {
    return {
      layers: {type: Array},
    }
  }
  // Declare reactive properties
  constructor() {
      super();
      this.layers = [];
  }
  // Render the UI as a function of component state
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('map-style', MapStyle);