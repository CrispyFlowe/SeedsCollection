/// <reference path = "./../base/copyright/License.ts" />

if (typeof window.Set === "undefined") {
    interface Set<T> {
        /**
         * Appends a new element with a specified value to the end of the Set.
         */
        add(value: T): this;

        clear(): void;
        /**
         * Removes a specified value from the Set.
         * @returns Returns true if an element in the 
         *          Set existed and has been removed, or false if the element does not exist.
         */
        delete(value: T): boolean;
        /**
         * Executes a provided function once per each value in the Set object, 
         * in insertion order.
         */
        forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
        /**
         * @returns a boolean indicating whether an element 
         *          with the specified value exists in the Set or not.
         */
        has(value: T): boolean;
        /**
         * @returns the number of (unique) elements in Set.
         */
        readonly size: number;
    }
}


export class DictionarySet<T> implements Set<T> {
    public add(value: T): this {
        throw new Error("Method not implemented.");
    }

    public clear(): void {
        throw new Error("Method not implemented.");
    }

    public delete(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    public has(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    public get size(): number {
        return 0;
    }

    public entries(): IterableIterator<[T, T]> {
        throw new Error("Method not implemented.");
    }

    public keys(): IterableIterator<T> {
        throw new Error("Method not implemented.");
    }

    public values(): IterableIterator<T> {
        throw new Error("Method not implemented.");
    }
    
    [Symbol.iterator](): IterableIterator<T> {
        throw new Error("Method not implemented.");
    }
    [Symbol.toStringTag]: string;
    
}


