/// <reference path = "./../base/copyright/License.ts" />

import { AbstractCollection } from "./AbstractCollection";


export interface VerticalGraph {
    r?: number;
    c?: number;
}
type SpecifiedVertGraph = [number, number];


/**
 * Graph
 * ---
 * Graph is a collection of elements sort by their coordinates position(row, column).
 * The Way to get elements from the graph is pass their coordinates value.
 * 
 * A Graph is sorted as shown below:
 * #A###
 * ##B##
 * #E#F#
 * ##C##
 * #D###
 * get({r: 3, c: 2}) => C
 * 
 * indexOf(B) => [1, 2];
 * 
 * indexOf(D, {r: 4}) => 1(1 is the column index of the element)
 * 
 * @author Cflower
 * 
 * @see StraightGraph
 * 
 * @template T
 */
export interface Graph<T> extends AbstractCollection<T> {
    /**
     * Returns array contains full elements of graph
     */
    toArray(): T[];

    /**
     * Add element to the end of graph
     * 
     * @param element 
     */
    add(element: T): boolean;

    /**
     * Remove element at specified position of graph
     * 
     * @param index 
     */
    remove(index: number): T;
    
    clear(): void;

    removeIf(filter: (element: T) => boolean): number;

    get(r: number, c: number): T;

    getArray(specified: VerticalGraph): T[];

    indexOf(element: T, specified?: VerticalGraph): number;

    includes(element: T, specified?: VerticalGraph): boolean;

    forEach(callbackfn: (element: T) => void, thisArg?: any): void;

    some(callbackfn: (element: T) => void | boolean, thisArg?: any): boolean;
    
    get length(): number;
}



