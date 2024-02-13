export async function fetchJson(url) {
  if (!url) {
    return;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }
    const json = await response.json();
    json._baseUrl = response.url;
    return json;
  } catch (error) {
    console.error(`Error loading JSON data from ${url}: ${error.message}`);
  }
}

export async function fetchText(url) {
  if (!url) {
    return;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading text data from ${url}: ${error.message}`);
  }
}

export async function fetchSource(layer) {
  if (layer?.source?.type === 'geojson' && layer.source.url) {
    try {
      const sourceUrl = layer._baseUrl ? new URL(layer.source.url, layer._baseUrl).href : layer.source.url;
      const source = await fetchJson(sourceUrl);
      if (!source) {
        console.error(`Error loading GeoJSON data from ${sourceUrl}: no data`);
        return;
      }
      layer.source = {
        type: 'geojson',
        data: source
      }
    } catch (error) {
      console.error(`Error loading GeoJSON data: ${error.message}`);
    }
  }
}

export async function fetchLayer(url, baseUrl) {
  if (!url) {
    return;
  }
  try {
    if (baseUrl) {
      url = new URL(url, baseUrl).href;
    }
    const layer = await fetchJson(url);
    if (!layer) {
      console.error(`Error loading layer from ${url}: no data`);
      return;
    }
    if (layer.type === 'fill' || layer.type === 'line' || layer.type === 'symbol' || layer.type === 'circle' || layer.type === 'raster' || layer.type === 'background' || layer.type === 'fill-extrusion' || layer.type === 'hillshade' || layer.type === 'heatmap' || layer.type === 'sky' || layer.type === 'custom') {    
      return layer;
    } else {
      throw new Error(`Unknown GeoJSON type: ${data.type}`);
    }
  } catch (error) {
    console.error(`Error loading GeoJSON data from ${url}: ${error.message}`);
  }
}