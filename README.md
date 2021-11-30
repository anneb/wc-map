# wc-map
Webcomponents map (wc-map) is a set of web-components to construct custom web map viewers.

### Currently implemented
This is work in pogress. Currently implemented are:
* &lt;map-libre&gt;
* &lt;map-layer-osm&gt;

### Developer Requirements
* git
* node (npm)

### Getting started
```bash
git clone this_repository
cd this_repository
npm install
npm start


### Documentation

To construct a map you can choose from:
```
<map-libre></maplibre>
<map-box></map-box>
<map-cesium></map-cesium>
<map-openlayers></map-openlayers>
<map-leaflet></map-leaflet>
```

To add a map layer:
```
<map-libre>
  <map-layer-osm></map-layer-osm>
</map-libre>
```

to add a map legend:
```
<map-libre>
  <map-legend>
  </map-legend>
</map-libre>
```

a more comprehensive web-viewer:
```
<map-libre>
  <map-style>
    <map-layer-osm></map-layer-osm>
  </map-style>
  <map-zoom></map-zoom>
  <map-scale></map-scale>
  <map-toolbar-toolpanel>
    <map-toolbar>
      <map-search></map-search>
        <map-catalog>
          <map-catalog-group>
            <map-catalog-layer></map-catalog-layer>
          </map-catalog-group>
        </map-catalog>
      <map-measure></map-measure>
      <map-info></map-info>
      <map-3d></map-3d>
      <map-gps></map-gps>
      <map-edit></map-edit>
    </map-toolbar>
  </map-toolbar-toolpanel>
  <map-style-info>
    <map-style-group>
      <map-layer-panel>
        <map-layer-title></map-layer-title>
          <map-layer-transparency></map-layer-transparency>
          <map-layer-legend>
            <map-layer-legend-title></map-layer-legend-title>
            <map-layer-legend-item></map-layer-legend-item>
            <map-layer-legend-abstract></map-layer-legend-abstract>
          </map-layer-legend>
      </map-layer-panel>
    </map-style-group>
  </map-style-info>
</map-libre>
```