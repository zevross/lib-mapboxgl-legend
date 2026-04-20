import { Metadata } from './types';
export declare const ensureArray: <T>(thing: T | T[]) => T[];
export declare const rescale: (val: number, x1: number, y1: number, x2?: number, y2?: number) => number;
export declare const chunk: <T>(array: T[], size: number) => T[][];
export declare const zip: <T>(...arrays: T[][]) => T[][];
export declare const toPair: <T>(stop: [T] | [T, T]) => [T | null, T];
export declare const toBins: <T, K>(stops: [T, K][]) => [[T | null, T | null], K][];
export declare const createElement: (tag: string, options?: {
    classes?: string | string[];
    styles?: Record<string, string>;
    attributes?: Record<string, string | number | boolean | null>;
    events?: Partial<Record<keyof HTMLElementEventMap, (event: Event) => void>>;
    content?: string | HTMLElement | boolean | (string | HTMLElement | undefined | boolean)[];
    appendTo?: HTMLElement;
}) => HTMLElement;
export declare const createImageCanvas: (data: any, width: number, height: number) => HTMLCanvasElement;
export declare const serializeLabel: <T>(value: T | T[], metadata?: Metadata) => string | boolean;
