declare const _default: {
    color: (expression: {
        name: string;
        getter: import('mapbox-gl').ExpressionSpecification | undefined;
        stops: [any, any][];
        inputs: any[];
        outputs: any[];
        min: number;
        max: number;
    }, layer: import('..').Layer, map: import('mapbox-gl').Map, options: import('..').LayerOptions) => HTMLElement | undefined;
    radius: (expression: {
        name: string;
        getter: import('mapbox-gl').ExpressionSpecification | undefined;
        stops: [string | number, number][];
        inputs: (string | number)[];
        outputs: number[];
        min: number;
        max: number;
    }, layer: import('..').Layer, map: import('mapbox-gl').Map, options: import('..').LayerOptions) => HTMLElement;
    image: (expression: {
        name: string;
        getter: import('mapbox-gl').ExpressionSpecification | undefined;
        stops: [string | number, string][];
        inputs: (string | number)[];
        outputs: string[];
        min: number;
        max: number;
    }, layer: import('..').Layer, map: import('mapbox-gl').Map, options: import('..').LayerOptions) => HTMLElement;
    pattern: (expression: {
        name: string;
        getter: import('mapbox-gl').ExpressionSpecification | undefined;
        stops: [string | number, string][];
        inputs: (string | number)[];
        outputs: string[];
        min: number;
        max: number;
    }, layer: import('..').Layer, map: import('mapbox-gl').Map, options: import('..').LayerOptions) => HTMLElement;
};
export default _default;
