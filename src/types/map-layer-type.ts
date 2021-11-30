import {MapLayerSourceType} from './map-layer-source-type'

export interface MapLayerType {
    title: string;
    id: string;
    type: string;
    metadata?: object;
    source: MapLayerSourceType;
}