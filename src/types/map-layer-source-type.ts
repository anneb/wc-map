export interface MapLayerSourceType {
    url: Array<string>;
    type: string;
    attribution?: string;
    minzoom?: number;
    maxzoom?: number;
    bounds?:[west: number, north: number, east: number, south: number],
    tileSize?: number;
}