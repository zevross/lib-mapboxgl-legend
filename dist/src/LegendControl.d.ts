import { IControl } from 'mapbox-gl';
import { MapboxMap, LayerOptions, LegendControlOptions } from './types';
export type { LayerOptions, LegendControlOptions };
export default class LegendControl implements IControl {
    private _options;
    private _container;
    private _panes;
    private _minimizer;
    private _map;
    constructor(options?: LegendControlOptions);
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
    addLayers(layers: NonNullable<LegendControlOptions["layers"]>): void;
    removeLayers(layerIds: (string | RegExp)[]): void;
    private _getBlocks;
    private _toggleButton;
    private _collapseButton;
    refresh(): void;
}
