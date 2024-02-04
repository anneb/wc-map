# wc-map (webcomponents map)
A set of webcomponent to create webmaps with extended functionalities. Add a layer managers, drawing tools, measurement tool etc, to different kinds of web maps.
Supported web maps are
* maplibre-gl
* mapbox-gl
* leaflet
* openlayers

## install and develop
```bash
git clone this_repository
cd this_repository
npm install
npm start
```

## build and deploy
```bash
npm run build
```
or if you want to add sourcemaps for better debugging of the deployed app:
```bash
npm run build:withmaps
```
The application will be built to the ```dist``` directory.

## test
```bash
npm test
```

To create new base images (cypress/snapshots/base):
1. update file ```cypress.config.js``` and change type 'regression' to 'base'
3. run:
```bash
npm test
``` 
4. now update file ```cypress.config.js```  and change type 'base' back to 'regression'

