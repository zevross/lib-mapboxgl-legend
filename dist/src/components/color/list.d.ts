import { MapboxMap, Layer, ParsedExpression, LayerOptions } from '../../types';
type Expression = ParsedExpression<string | number | number[], string>;
declare const _default: (expression: Expression, layer: Layer, map: MapboxMap, options: LayerOptions) => HTMLElement;
export default _default;
