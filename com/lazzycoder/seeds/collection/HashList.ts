import { List } from "./List";


export class HashList<T> implements List<T> {
    add(e: T): boolean;
    add(e: T, index: number): boolean;
    add(e: unknown, index?: unknown): boolean {
        throw new Error("Method not implemented.");
    }
    remove(index: number): T | undefined {
        throw new Error("Method not implemented.");
    }
    pop(): T | undefined {
        throw new Error("Method not implemented.");
    }
    shift(): T | undefined {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    get(index: number): T | undefined {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: T, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: T, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    toArray(): T[] {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (e: T) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    find(callbackfn: (e: T) => boolean | void, thisArg?: any): void | T {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): List<T> {
        throw new Error("Method not implemented.");
    }
    length: number;
    removeIf(predicate: (element: T) => boolean): number {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    
}


