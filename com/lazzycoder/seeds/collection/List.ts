
/// extends AbstractCollection<T> 

import { AbstractCollection } from "./AbstractCollection";

//# <reference path = "./AbstractCollection.ts" /> 

/**
 * List
 * ---
 * List is a interface of collection of all kinds of lists
 * this is not implemented as a array, if  you need to use a array, use {Array} instead
 * 
 * implementation of this interface includes linkedlist, gaplist, hashlist, 
 * cachelist etc.
 * 
 * A list must have this specified features: contains item, get / find item, sort by index, 
 * can add items, remove items, and index items.
 * 
 * @author Cflower 
 * 
 * @see Array
 * @see AbstractCollection
 * @see LinkedList
 */
export interface List<T> extends AbstractCollection<T>  {

    /**
     * Appends new elements to the end of an list, 
     * and returns [true] if modified of the list.
     * @param e New elements to add to the list.
     */
    add(e: T): boolean;

    add(e: T, index: number): boolean;


    /**
     * Removes elements from an list
     * @param index The zero-based location in the list 
     *              to tell where to removing elements.
     * @returns An element that were removed.
     */
    remove(index: number): T | undefined;


    /**
     * Removes the last element from an list and returns it.
     * If the list is empty, undefined is returned and the list is not modified.
     */
    pop(): T | undefined;


    /**
     * Removes the first element from an list and returns it.
     * If the list is empty, undefined is returned and the list is not modified.
     */
    shift(): T | undefined;

    
    /**
     * Remove all elements from the list, 
     * this list will be emptied after the method returns.
     */
    clear(): void;


    /**
     * Returns the element at the specified given index, 
     * or undefined if index is out of bounds.
     * @param index The zero-based location to get specified element.
     */
    get(index: number): T | undefined;


    /**
     * Returns the index of the first occurrence of a value in an list, or -1 if it is not present.
     * @param searchElement The value to locate in the list.
     * @param fromIndex The list index at which to begin the search. 
     *                  If fromIndex is omitted, the search starts at index 0.
     */
    indexOf(searchElement: T, fromIndex?: number): number;


    /**
     * Determines whether an array includes a certain element, 
     * returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to 
     *                  begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;

    toArray(): T[];


    /**
     * Performs the specified action for each element in an list.
     * @param callbackfn  A function that accepts up to three arguments. 
     *              forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
     *              If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (e: T) => void, thisArg?: any): void;

    some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean;

    /**
     * Returns the value of the first element in the list where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the list, in ascending
     *                  order, until it finds one where predicate returns true. 
     *                  If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     *                  predicate. If it is not provided, undefined is used instead.
     */
    find(callbackfn: (e: T) => boolean | void, thisArg?: any): T | void;


    /**
     * Returns a copy of a section of an list.
     * For both start and end, a negative index can be used to indicate 
     * an offset from the end of the list.
     * For example, -2 refers to the second to last element of the list.
     * @param start The beginning index of the specified portion of the list.
     *              If start is undefined, then the slice begins at index 0.
     * @param end The end index of the specified portion of the list. 
     *              This is exclusive of the element at the index 'end'.
     * If end is undefined, then the slice extends to the end of the list.
     */
    slice(start?: number, end?: number): List<T>;


    /**
     * Gets or sets the length of the array. 
     * This is a number one higher than the highest index in the array.
     */
    length: number;

    /**
     * this method is optional
     * optional default optional method, 
     * remove elements when match given predicate function
     * 
     * @default this method is optional
     */
    removeIf(predicate: (element: T) => boolean): number;

    
    toString(): string;
}



