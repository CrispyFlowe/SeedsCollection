/// <reference path = "./../base/copyright/License.ts" />

import { List } from "./List";
import { ArrayUtil } from "./util/ArrayUtil";

type Void = void;
type Optional<T> = T | undefined;


export class CachedList<T> implements List<T> {

    private static readonly DEFAULT_GROW: undefined[] = ((): undefined[] => {
        let s: undefined[] = [];
        for (let i: number = 0; i < 100; ++i) {
            s.push(void(0));
        }
        return s;
    })();

    private elements: (T | undefined)[];

    private size: number;


    /**
     * Appends new elements to the end of an list, 
     * and returns [true] if modified of the list.
     * @param e New elements to add to the list.
     */
    public add(e: T, index?: number): boolean {
        if (this.autoHandle(this.length++)) {
            this.elements[this.length - 1] = e;
            return true;
        }
        return false;
    }


    /**
     * Removes elements from an list
     * @param index The zero-based location in the list 
     *              to tell where to removing elements.
     * @returns An element that were removed.
     */
    public remove(index: number): T | undefined {
        if (this.checkInBound(index)) {
            var e: T | undefined = this.elements[index];
            this.doShiftEs(index);
            return e;
        }
        return void(0);
    }

    private doShiftEs(index: number): void {
        if (this.checkInBound(index)) {
            for (let i = index; i < this.size - 1; ++i) {
                this.elements[i] = this.elements[i + 1];
            }
            --this.size;
        }
    }

    /**
     * Removes the last element from an list and returns it.
     * If the list is empty, undefined is returned and the list is not modified.
     */
    public pop(): T | undefined {
        let e: Optional<T>;
        if (this.size > 0) {
            e = this.elements[--this.size] 
            this.elements[this.size] = void(0);
            return e;
        }
        return void(0);
    }

    /**
     * Removes the first element from an list and returns it.
     * If the list is empty, undefined is returned and the list is not modified.
     */
    public shift(): T | undefined {
        let e: Optional<T>;
        if (this.size > 0) {
            e = this.elements[0]; 
            this.doShiftEs(0);
            return e;
        }
        return void(0);
    }


    /**
     * Returns the element at the specified given index, 
     * or undefined if index is out of bounds.
     * @param index The zero-based location to get specified element.
     */
    public get(index: number): T | undefined {
        return this.elements[index];
    }


    /**
     * Returns the index of the first occurrence of a value in an list, or -1 if it is not present.
     * @param searchElement The value to locate in the list.
     * @param fromIndex The list index at which to begin the search. 
     *                  If fromIndex is omitted, the search starts at index 0.
     */
    public indexOf(searchElement: T, fromIndex?: number | undefined): number {
        // NOTE remember to check index method
        return (this.elements.slice((fromIndex ?? 0), this.size)).indexOf(searchElement);
    }


    /**
     * Determines whether an array includes a certain element, 
     * returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to 
     *                  begin searching for searchElement.
     */
    public includes(searchElement: T, fromIndex?: number | undefined): boolean {
        return (this.indexOf(searchElement, (fromIndex ?? 0)) >= 0);
    }

    public toArray(): T[] {
        return (this.elements.slice(0, this.size) as T[]);
    }


    /**
     * Performs the specified action for each element in an list.
     * @param callbackfn  A function that accepts up to three arguments. 
     *              forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
     *              If thisArg is omitted, undefined is used as the this value.
     */
    public forEach(callbackfn: (e: T) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }


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
    public find(callbackfn: (e: T) => boolean | void, thisArg?: any): void | T {
        throw new Error("Method not implemented.");
    }


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
    public slice(start?: number | undefined, end?: number | undefined): List<T> {
        return (
            ArrayUtil.toList(this.toArray()
                     .slice((start ?? 0), (end ?? this.size))) as List<T>
        );
    }

    public clear(): void {
        for (let i = 0, len = this.size; i < len; ++i) {
            this.elements[i] = void(0);
        }
        this.size = 0;
        this.updated();
    }

    public removeIf(predicate: (element: T) => boolean): number {
        let i: number, j: number, o: number = this.elements.length;
        for (i = 0, j = 0; i < this.length; ++i) {
            if (predicate(this[i])) {
                this.elements[i] = void(0);
            } else {
                this.elements[j++] = this.elements[i];
            }
        }
        this.updated();
        this.size = j;
        return (o - j);
    }

    public toString(): string {
        return (this.toArray().toString());
    }

    private checkInBound(index: number): boolean {
        return (index >= 0 && index < this.length);
    }

    public get length(): number {
        return this.size;
    }

    public set length(value: number) {
                
    }


    private setAt(index: number, element: T): void {
        if (index < 0) 
            return void(0);
        if (index < this.elementSize()) {
            this.elements[index] = element;
        } else {
            /* should grow now */
            while (index >= this.elementSize())
                this.grow();
            this.elements[index] = element;
        }
    }

    private version: number = 0;

    private updated(): number {
        return ++this.version;
    }

    private autoHandle(index: number): boolean {
        if (index >= this.elementSize()) {
            while (index >= this.elementSize())
                this.grow();
        } else if (index < 0) {
            return false;
        }
        return true;
    }

    private grow(amount?: number): void {
        const growam = this.growthAmount();
        // 100 - 1
        // 900 - 9
        // 950 - 9 and 50
        for (let i = 0; i < Math.floor(growam / CachedList.DEFAULT_GROW.length); ++i) {
            this.elements.concat(CachedList.DEFAULT_GROW);
        }
        // the rest of the following elements
        for (let i = 0; i < growam % CachedList.DEFAULT_GROW.length; ++i) {
            this.elements.push(void(0));
        }
    }


    private elementSize(): number {
        return this.elements.length;
    }

    private growthPerc: number = 50;

    private growthAmount(): number {
        /* usually half of size */
        var gr = Math.floor(this.elementSize() * 100 / this.growthPerc);
        return gr;
    }


    some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    every(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }

    public constructor(from: T[] | CachedList<T> | List<T>);

    public constructor(length: number);

    public constructor(from: T[] | CachedList<T> | List<T>, 
                        length: number, customeGrowth: number);

    public constructor() {
        switch (arguments.length) {
            case 0: {
                this.elements = [];
                this.size = 0;
                break;
            }

            case 1: {
                var of: any;
                switch (typeof (of = arguments[0])) {
                    case "number": {
                        this.elements = [];
                        this.length = of as number;
                        break;
                    }

                    case "object": {
                        /** of can be Array, List or CachedList */
                        if (of instanceof Array) {
                            this.elements = of as Array<T>;
                        } else if (of instanceof CachedList) {
                            this.elements = (of as CachedList<T>).elements;
                        } else {
                            this.elements = (of as List<T>).toArray();
                        }
                        this.length = of.length;
                        break;
                    }

                    case "undefined": {
                        if (of == void(0)) {
                            this.elements = [];
                            this.length = 0;
                        }
                        break;
                    }
                }
                break;
            }

            case 3: {
                this.growthPerc = arguments[2];
                break;
            }
        }
    }
}

