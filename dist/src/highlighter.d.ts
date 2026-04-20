import { MapboxMap, Layer, ParsedExpression } from './types';
type Options = {
    delta?: number;
};
declare const _default: (expression: ParsedExpression<any, any>, layer: Layer, map: MapboxMap) => {
    highlight: (value: string | number | number[] | undefined, options?: Options) => void;
    events: (value: string | number | number[]) => {
        mouseenter: () => void;
        mouseleave: () => void;
    };
};
export default _default;
