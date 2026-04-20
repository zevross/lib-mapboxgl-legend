import { MapboxMap, Layer, ParsedExpression, LayerOptions } from '../../types';
type Expression = ParsedExpression<any, any>;
declare const _default: (expression: Expression, layer: Layer, map: MapboxMap, options: LayerOptions) => HTMLElement | undefined;
export default _default;
