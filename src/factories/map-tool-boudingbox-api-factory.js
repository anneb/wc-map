import { MaplibreglToolBoundingboxAPI } from '../map-apis/maplibregl-tool-boundingbox-api.js';

class MapToolBoundingboxAPIFactory {
  static getAPI(mapInstance) {
    switch (mapInstance?.constructor?.name) {
      case 'WebMapLibreGL':
      case 'WebMapBoxGL':
        return new MaplibreglToolBoundingboxAPI(mapInstance);
      default:
        throw new Error("Unsupported map type");
    }
  }
}

export { MapToolBoundingboxAPIFactory };