/// <reference path = "./../base/copyright/License.ts" />

import { Types } from "./../typing/Types";
import { Graph, VerticalGraph } from "./Graph";


function defined(obj: any) {
    return (obj != void(0));
}


export class StraightCoordinate<T> implements Graph<T> {

    public static readonly REMOVED = {};

    private columnLen: number;
    private size: number;
    private elements: T[];

    
    public constructor(columnLen: number);

    public constructor(elements: T[] | StraightGraph<T>);

    public constructor(...args: any[]) {
        if (Types.matches(args, ["number"])) {
            this.columnLen = args[0];
            this.elements = [];
            this.size = 0;
        } else {
            if (args[0] instanceof Array<T>) {
                this.columnLen = 30;
                this.elements = args[0];
                this.size = this.elements.length;
            } else if (args[0] instanceof StraightGraph<T>) {
                this.columnLen = args[0].columnLen;
                this.elements = args[0].elements;
                this.size = this.elements.length;
            } else {
                this.columnLen = 30;
                this.elements = [];
                this.size = 0;
            }
        }
    }

    public toArray(): T[] {
        return this.elements;
    }

    public add(element: T): boolean {
        this.elements[this.size++] = element;
        return true;
    }

    public remove(index: number): T {
        var removed: T = (this.elements.splice(index, 1))[0];
        return removed;
    }

    public clear(): void {
        this.elements.length = 0;
    }
    
    public removeIf(filter: (element: T) => boolean): number {
        let i: number, j: number, len: number, s: number = this.elements.length;
        for (i = 0, j = 0, len = this.elements.length; i < len; ++i) {
            if (!filter(this.elements[i])) {
                this.elements[j++] = this.elements[i];
            }
        }
        this.elements.length = this.size = j;
        return (s - j);
    }

    public get(r: number, c: number): T {
        let ptr: number = (r + (c * this.columnLen));
        return this.elements[ptr];
    }

    public getArray(specified: VerticalGraph): T[] {
        let eSet: T[] = [];
        if (defined(specified.r)) {
            for (let searchn = specified.r!, len = this.size; 
                            searchn < len; searchn += this.columnLen) {
                eSet.push(this.elements[searchn]);
            }
            return eSet;
        } else if (defined(specified.c)) {
            let beg = (specified.c!) * this.columnLen;
            /* get copy of entire column */
            eSet = this.elements.slice(beg, beg + this.columnLen);
            return eSet;
        } else {
            /* if defined both r, c or both not defined */
            return eSet;
        }
    }


    public indexOf(element: T, specified?: VerticalGraph | undefined): number {
        if (defined(specified)) {
            let spec = this.getArray(specified!);
            return spec.indexOf(element);
        } else {
            return (this.elements.indexOf(element));
        }
    }


    public includes(element: T, specified?: VerticalGraph | undefined): boolean {
        if (defined(specified)) {
            return this.indexOf(element, specified) >= 0;
        } else {
            return (this.elements.indexOf(element) >= 0);
        }
    }

    public forEach(callbackfn: (element: T) => void, thisArg?: any): void {
        this.elements.forEach(callbackfn, thisArg);
    }
    
    public find(callbackfn: (e: T) => boolean | void, thisArg?: any): T | undefined {
        return this.elements.find(callbackfn, thisArg);
    }

    public some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        return this.elements.some(callbackfn, thisArg);
    }

    public get length(): number {
        return this.elements.length;
    }

    private elementAt(r: number, c: number): number {
        return (r + (c * this.columnLen));
    }
}



