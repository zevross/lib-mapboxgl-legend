import { Expression, ParsedExpression } from './types';
declare const _default: {
    isExpression: (e: any) => e is Expression;
    parse: (input: any) => ParsedExpression<any, any>[];
};
export default _default;
