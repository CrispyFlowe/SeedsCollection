
export class DisUtil {
    public static getVersionInfo(): string {
        return "JavaScript, EcmaScript " + 
                this.getVersion() +
                 ", ES" + String(2009 + this.getVersion());
        // ex: 6.0, ES2015
    } 

    public static getVersion(): number {
        return this.testVersion();
    }

    private static testVersion(): number {
        switch (true) {
            case (typeof window.Object.fromEntries !== "undefined"): {
                return 10.0;
            }
            case (typeof window.Object.entries !== "undefined" 
                    && typeof window.Object.values !== "undefined"): {
                return 8.0;
            }
            case (typeof window.Set !== "undefined" && typeof window.Map !== "undefined"): {
                return 6.0;
            }
            case (typeof window.Object.defineProperty !== "undefined"): {
                return 5.0;
            }
            default: {
                return 3.0;
            }
        }
    }
}


type PrimaryTypes = (
    "bigint" | "boolean" | "string" | "number" | 
    "function" | "object" | "symbol" | "undefined"
);


export class Types<T> {
    public static matches(types: ArrayLike<any>, 
                            customeTypes: (PrimaryTypes | Function | string[])[]): boolean {
        if (types.length !== customeTypes.length)
            return false;
        for (let i = 0; i < customeTypes.length; ++i) {
            if (typeof customeTypes[i] === "string") {
                if (customeTypes[i] !== typeof types[i])
                    return false;
            } else if (customeTypes[i] instanceof Array) {
                for (let j = 0; j < customeTypes[i].length; ++j) {
                    if ((customeTypes[i][j]) in types[i]) {
                        continue;
                    } else {
                        return false;
                    }
                }
            } else {
                /* typeof customeType is Function */
                if (!(types[i] instanceof (customeTypes[i] as Function))) 
                    /* if types[i] does not match customeType[i] */
                    return false;
            }
        }
        return true;
    }

    public static matchAtLeast() {}
    

    public static signiture() {
        
    }

    public static getCases(): number {
        return 0;
    }

    public static overload(): number {
        return 0;
    }
}

// extends AbstractCollection<T> 

//# <reference path = "./AbstractCollection.ts" /> 

/**
 * List is a interface of collection of all kinds of lists
 * this is not implemented as a array, if  you need to use a array, use {Array} instead
 * -
 * implementation of this interface includes linkedlist, gaplist, hashlist, 
 * cachelist etc.
 * -
 * A list must have this specified features: contains item, get / find item, sort by index, 
 * can add items, remove items, and index items.
 * 
 * @author Cflower 
 * 
 * @see Array
 * @see AbstractCollection
 * @see LinkedList
 */
 export interface List<T> {

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

    every(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean;

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

export class ArrayUtil {
    public static toList<T>(arr: T[]): List<T> {
        throw new Error("Method not implemented.");
    }

    public static takeout<T>(arr: T[], index: number): T | undefined {
        arr[index] = arr[arr.length - 1];
        return arr.pop();
    }
    
    public static insert<T>(arr: T[], index: number, element: T): T {
        arr.splice(index, 0, element);
        return element;
    }

    public static arraycopy<T>(src: T[], srcPos: number, 
                                dest: T[], destPos: number, len: number): T[] {
        if (this.getVersionInfo(src) < 6.0) {
            return dest;
        }
        dest.length = destPos;
        dest.concat(src.slice(srcPos, srcPos + len));
        return dest;
    }

    // let end: number = Math.min(srcPos + len + 1, src.length);

    public static getVersionInfo<T>(arr: T[]): number {
        return 0.00;
    }

    public static copyOf<T>(arr: T[]): T[] {
        return arr.slice(0);
    }

    public static copyOfRange<T>(arr: T[], start?: number, end?: number): T[] {
        return arr.slice((start ?? 0), (end ?? (arr.length - 1)));
    }

    public static clear<T>(arr: T[]): void {
        arr.length = 0;
    }
}

export interface AbstractCollection<T> {

}


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


interface LinkedNode<T> {
    /**
     * Current element
     */
    curr: T;

    /**
     * Only if this node is this first node, otherwise it cannot be undefined
     * @optional prev element is optional
     */
    prev?: LinkedNode<T> | undefined;

    /**
     * Only if this node is this last node, otherwise it cannot be undefined
     */
    next: LinkedNode<T> | undefined;
}


/**
 * LinkedList
 * One-Lined list
 * 
 * @author Cflower
 */
export class LinkedList<T> implements List<T> {
    /**
     * first element node of linked list
     */
    private firstNode: LinkedNode<T> | undefined = void(0);

    /**
     * last element node of linked list
     */
    private lastNode: LinkedNode<T> | undefined = void(0);

    /**
     * length of linked list
     */
    private size: number = 0;

    public get length(): number {
        return this.size;
    }

    public set length(value: number) {
        this.size = value;
    }
    
    /**
     * add a node with element to the linked list
     * @param e element need to add
     * @returns 
     */
    public add(e: T): boolean {
        /* insert element at the end of linked list */
        if (this.size === 0) {
            this.firstNode = this.setNextNode(e);
            this.lastNode = this.firstNode;
            ++this.size;
        } else if (this.size === 1) {
            var n: LinkedNode<T>;
            /* linkup all nodes together */
            this.firstNode!.next = (n = this.setNextNode(e));
            this.lastNode = n;
            
            ++this.size;
        } else {
            /* add element when length > 1 */
            var n: LinkedNode<T>;
            this.lastNode!.next = (n = this.setNextNode(e));
            this.lastNode = n;
            ++this.size;
        }
        return true;
    }

    /**
     * get the specified element from the specified index
     * @param index 
     * @returns 
     */
    public get(index: number): T | undefined {
        var i: number = 0;
        /* iterate through list and find element */
        return this.find((e) => { 
            if (i === index) 
                return true;
            ++i;
        }) as T | undefined;
    }

    /**
     * remove a node with element from linked list by specified index
     * @param index specified index of element to remove
     * @returns [T] if found and removed specified element, or [undefined] if 
     *              do not found it
     */
    public remove(index: number): T | undefined {
        if (
            (this.firstNode == void(0) || this.size < 1) || 
            (index !== 0 && this.size < 2)
        ) 
            return void(0);
        var currentNode: LinkedNode<T> = this.firstNode;
        if (index === 0) {
            this.firstNode = this.firstNode!.next;
            return void(0); 
        }
        /* iterate through list to find specified element to remove */
        for (var nodeunit = 0, len = this.size; nodeunit < len; nodeunit++) {
            if ((nodeunit - 1) === index) {
                /* found element to remove */
                currentNode.next = currentNode.next!.next;
            }
            if (currentNode.next != void(0)) 
                currentNode = currentNode.next;
            else 
                break;
        }
        return void(0);
    }

    
    public indexOf(element: T): number {
        var i: number = 0;
        this.find((e) => {
            if (e === element)
                return true;
            ++i;
        });
        return i;
    }

    public forEach(callbackfn: (e: T) => void): void {
        this.find(callbackfn);
    }


    public find(callbackfn: (e: T) => boolean | void): T | void {
        if (this.firstNode == void(0)) 
            return void(0);
        var currentNode: LinkedNode<T> = this.firstNode;
        for (var unode = 0, len = this.size; unode < len; unode++) {
            if (callbackfn(currentNode.curr)) 
                return currentNode.curr;
            if (currentNode.next != void(0)) 
                currentNode = currentNode.next;
            else 
                break;
        }
        return void(0);
    }

    public toString(): string {
        /* get string representation of linked list's nodes */
        var str: string = "";
        this.forEach((e: T) => {
            str += (e + " => ");
        });
        str += "None";
        return str;
    }

    public shift(): T | undefined {
        if (this.size < 1) {
            return void(0);
        }
        var e: T | undefined = this.firstNode!.curr;
        this.firstNode = this.firstNode!.next;
        return e;
    }

    
    public pop(): T | undefined {
        throw new Error("Method not implemented.");
    }

    public includes(searchElement: T, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }

    public slice(start?: number | undefined, end?: number | undefined): List<T> {
        throw new Error("Method not implemented.");
    }

    public removeIf(predicate: (element: T) => boolean): number {
        throw new Error("Method not implemented.");
    }

    public clear(): void {
        /** Simplly empty first and last node, let gc do rest of work */
        this.firstNode = void(0);
        this.lastNode = void(0);
        this.size = 0;
    }

    public toArray(): T[] {
        var ar: T[] = [];
        this.forEach((e) => {
            ar.push(e);
        });
        return ar;
    }

    public getLast(): T | undefined {
        return this.lastNode?.curr;
    }

    public removeLast(): T | undefined {
        if (this.size === 0) {
            return void(0);
        }
        if (this.size === 1) {
            var e: T | undefined = this.lastNode?.curr;
            this.firstNode = this.lastNode = void(0);
            --this.size;
            return e;
        } else {
            /* size is > 1 */
            this.remove(this.size--);
        }
    }

    public toSample(): number {
        return 0;
    }

    private setNextNode(e: T): LinkedNode<T> {
        return {
            curr: e,
            next: void(0)
        }
    }

    public constructor() {

    }

    public some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }

    public every(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
}

export interface VerticalGraph {
    r?: number;
    c?: number;
}


type SpecifiedVertGraph = [number, number];


export interface Graph<T> extends AbstractCollection<T> {
    toArray(): T[];

    add(element: T): boolean;

    remove(index: number): T;
    
    clear(): void;

    removeIf(filter: (element: T) => boolean): number;

    get(r: number, c: number): T;

    getArray(specified: VerticalGraph): T[];

    indexOf(element: T, specified?: VerticalGraph): number;

    includes(element: T, specified?: VerticalGraph): boolean;

    forEach(callbackfn: (element: T) => void, thisArg?: any): void;

    find(callbackfn: (e: T) => boolean | void, thisArg?: any): T | undefined;

    some(callbackfn: (element: T) => void | boolean, thisArg?: any): boolean;

    every(callbackfn: (element: T) => void | boolean, thisArg?: any): boolean;
    
    get length(): number;
}


function defined(obj: any) {
    return (obj != void(0));
}


class StraightGraph<T> implements Graph<T> {

    public static readonly REMOVED = {};

    private columnLen: number;
    private size: number;
    private elements: T[];

    
    public constructor(columnLen: number, elements: T[] | StraightGraph<T>);

    public constructor() {
        
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
        this.elements.length = j;
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
        throw new Error("Method not implemented.");
    }

    public every(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }

    public get length(): number {
        return this.size;
    }

    private elementAt(r: number, c: number): number {
        return (r + (c * this.columnLen));
    }
}


export interface Queue<T> {
    addFirst(element: T): boolean;
    addLast(element: T): boolean;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    pollFirst(): T | undefined;
    pollLast(): T | undefined;
    get(index: number): T | undefined;
    remove(index: number): T | undefined;
    get length(): number;
}


export class ArrayQueue<T> implements Queue<T> {

    private elements: T[] = [];

    public addFirst(element: T): boolean {
        var p: number = this.elements.length;
        return (this.elements.unshift(element) - p > 0);
    }

    public addLast(element: T): boolean {
        var p: number = this.elements.length;
        return (this.elements.push(element) - p > 0);
    }

    public peekFirst(): T | undefined {
        return (this.elements[0]);
    }

    public peekLast(): T | undefined {
        return (this.elements[this.elements.length - 1]);
    }

    public pollFirst(): T | undefined {
        return this.elements.shift();
    }

    public pollLast(): T | undefined {
        return this.elements.pop();
    }

    public get(index: number): T | undefined {
        return this.elements[index];
    }

    public remove(index: number): T | undefined {
        return this.elements.splice(index, 1)[0];
    }

    public get length(): number {
        return this.elements.length;
    } 
}

/* Header initialize */
if (typeof window.Map == "undefined") {
    interface Map<K, V> {

        clear(): void;
        /**
         * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
         */
        delete(key: K): boolean;
        /**
         * Executes a provided function once per each key/value pair in the Map, in insertion order.
         */
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        /**
         * Returns a specified element from the Map object. If the value that 
         * is associated to the provided key is an object, then you will 
         * get a reference to that object and any change made to that object will effectively modify it inside the Map.
         * @returns Returns the element associated with the specified key. 
         * If no element is associated with the specified key, undefined is returned.
         */
        get(key: K): V | undefined;
        /**
         * @returns boolean indicating whether an element with the specified key exists or not.
         */
        has(key: K): boolean;
        /**
         * Adds a new element with a specified key and value to the Map. 
         * If an element with the same key already exists, the element will be updated.
         */
        set(key: K, value: V): this;
        /**
         * @returns the number of elements in the Map.
         */
        readonly size: number;
    }
}


/** Dictionary */ 
export class Dictionary<K, V> implements Map<K, V> {

    private elementStorage: { [key: string]: any } = {};
    
    private serialObject(obj: any): string {
        return (Object.prototype.toString.call(obj));
    }

    
    public clear(force?: boolean): void {
        if (force || Object.keys(this.elementStorage).length < 0) { 
            this.elementStorage = {}; 
            return;
        }
        const prop = Object.getOwnPropertyNames(this.elementStorage);
        for (var i = 0; i < prop.length; ++i) {
            delete this.elementStorage[prop[i]];
        }
    }


    // TODO check
    public delete(key: K): boolean {
        var _key = this.serialObject(key);
        var r = this.has(key);
        if (r == false) return false;
        delete this.elementStorage[_key];
        return true;
    }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    public get(key: K): V | undefined {
        return (this.elementStorage[this.serialObject(key)]);
    }

    public has(key: K): boolean {
        var cont = (key in this.elementStorage);
        return cont;
    }

    public set(key: K, value: V): this {
        this.elementStorage[this.serialObject(key)] = value;
        return this;
    }

    public get size(): number {
        return (Object.keys(this.elementStorage).length);
    }

    public entries(): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }

    public keys(): IterableIterator<K> {
        throw new Error("Method not implemented.");
    }

    public values(): IterableIterator<V> {
        throw new Error("Method not implemented.");
    }

    public [Symbol.iterator](): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }

    public [Symbol.toStringTag]: string;
}


/**
 * BiDictionary
 */
export class BiDictionary<K, V> {

    private readonly dictA: Dictionary<K, V> = new Dictionary<K, V>();
    private readonly dictB: Dictionary<V, K> = new Dictionary<V, K>();
    

    public constructor() {
        
    }

    public get(key: K): V | undefined {
        return this.dictA.get(key);
    }

    public getKey(value: V): K | undefined {
        return this.dictB.get(value);
    }


    public delete(key: K): V | undefined {
        let v: V | undefined = this.dictA.get(key);
        if (v == void(0))
            /* does not contains specified key or value */
            return void(0);
        let val: V = v as V;
        this.dictA.delete(key);
        this.dictB.delete(val);
        return v;
    }

    public deleteKey(value: V): K | undefined {
        let k: K | undefined = this.dictB.get(value);
        if (k == void(0))
            /* does not contains specified key or value */
            return void(0);
        let key: K = k as K;
        this.dictA.delete(key);
        this.dictB.delete(value);
        return k;
    }

    public has(key: K): boolean {
        return (this.dictA.has(key));
    }

    public set(key: K, value: V): V | undefined {
        let v: V | undefined = this.dictA.get(key);
        this.dictA.set(key, value);
        this.dictB.set(value, key);
        return v;
    }

    public reverse(): void {
        
    }
}

// if no specified value found: throw new Error("value not found: " + key);

/// <reference path = "./../base/copyright/License.ts" />


/* Header initialize */
if (typeof window.Map == "undefined") {
    interface Map<K, V> {

        clear(): void;
        /**
         * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
         */
        delete(key: K): boolean;
        /**
         * Executes a provided function once per each key/value pair in the Map, in insertion order.
         */
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        /**
         * Returns a specified element from the Map object. If the value that 
         * is associated to the provided key is an object, then you will 
         * get a reference to that object and any change made to that object will effectively modify it inside the Map.
         * @returns Returns the element associated with the specified key. 
         * If no element is associated with the specified key, undefined is returned.
         */
        get(key: K): V | undefined;
        /**
         * @returns boolean indicating whether an element with the specified key exists or not.
         */
        has(key: K): boolean;
        /**
         * Adds a new element with a specified key and value to the Map. 
         * If an element with the same key already exists, the element will be updated.
         */
        set(key: K, value: V): this;
        /**
         * @returns the number of elements in the Map.
         */
        readonly size: number;
    }
}

/** TreeDict */
/// indev
export class TreeDictionary<K, V> implements Map<K, V> {
    "indev"
    private static readonly COLOR = class {
        public static readonly BLACK: number = 0;
        public static readonly RED: number   = 1;
    }

    constructor() {
        
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }

    delete(key: K): boolean {
        throw new Error("Method not implemented.");
    }

    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    get(key: K): V | undefined {
        throw new Error("Method not implemented.");
    }

    has(key: K): boolean {
        throw new Error("Method not implemented.");
    }

    set(key: K, value: V): this {
        throw new Error("Method not implemented.");
    }

    size: number;

    entries(): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }

    keys(): IterableIterator<K> {
        throw new Error("Method not implemented.");
    }

    values(): IterableIterator<V> {
        throw new Error("Method not implemented.");
    }
    
    [Symbol.iterator](): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }
    [Symbol.toStringTag]: string;

}

export class Pair<A, B> {
    public elementA: A;
    public elementB: B;

    public constructor(elementA: A, elementB: B) {
        this.elementA = elementA;
        this.elementB = elementB;
    }

    public getA(): A {
        return this.elementA;
    }

    public getB(): B {
        return this.elementB;
    }

    public get A(): A {
        return this.elementA;
    }

    public get B(): B {
        return this.elementB;
    }
}

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

export class SynchedArray<A, B> {
    private arrayA: A[] = [];
    private arrayB: B[] = [];

    public add(a: A, b: B): void {
        this.arrayA.push(a);
        this.arrayB.push(b);
    }

    public remove(a: A, b: B): boolean;

    public remove(index: number): [A, B];

    public remove(...args: any[]): boolean | [A, B] {
        if (Types.matches(args, ["number"])) {
            var removed: [A, B] = [
                this.arrayA.splice((args[0] as number), 1)[0],
                this.arrayB.splice((args[0] as number), 1)[0]
            ];
            return removed;
        } else {
            var ai: number = this.arrayA.indexOf(args[0]);
            var bi: number = this.arrayB.indexOf(args[1]);
            this.arrayA.splice(ai, 1)[0],
            this.arrayB.splice(bi, 1)[0]
            return true;
        }
    }

    public getA(): A[] {
        return this.arrayA;
    }

    public getB(): B[] {
        return this.arrayB;
    }

    public get A(): A[] {
        return this.arrayA;
    }

    public get B(): B[] {
        return this.arrayB;
    }

    public constructor(...args: any[]) {
        
    }
}

type Comparef = <A, B>(a: A, b: B) => number; 


export class BinarySearch {

    public static arraySearchBS<U>(arr: U[], element: U, 
                                beg: number, end: number): U | undefined {
        if (beg > end) {
            return void(0);
        }
        let mids = Math.floor((beg + end) / 2);

        if (arr[mids] === element) {
            return element;
        }

        if (arr[mids] > element) {
            return (this.arraySearchBS(arr, element, beg, mids - 1));
        } else {
            return (this.arraySearchBS(arr, element, mids + 1, end));
        }
    }

    public static arrayBS<U>(arr: U[], element: U, beg: number, end: number): boolean {
        return (this.arraySearchBS(arr, element, beg, end) != void(0));
    }

    public static arrayIndexBS<U>(arr: U[], element: U, beg: number, end: number): number {
        if (beg > end) {
            return -1;
        }
        let mids = Math.floor((beg + end) / 2);

        if (arr[mids] === element) {
            return mids;
        }

        if (arr[mids] > element) {
            return (this.arrayIndexBS(arr, element, beg, mids - 1));
        } else {
            return (this.arrayIndexBS(arr, element, mids + 1, end));
        }
    }

    // "toString" in arr[i]

    public static arrayElementBS<U>(arr: U[], element: U, 
                            compareFunc?: Comparef, beg?: number, end?: number): number {
        let num: number[] = [];
        for (let i = 0; i < arr.length; ++i) {
            if ("toString" in arr[i]) {
                // @ts-ignore
                num.push(hashCode(arr[i].toString()));
            }
            num.push(hashCode(String(arr[i])));
        }
        // @ts-ignore
        compareFunc = compareFunc ?? ((a: number, b: number) => (a - b));
        
        return (BinarySearch.arrayCompareBS(
            // @ts-ignore
            num, hashCode(String(element)), compareFunc, beg, end
        ));
    }

    /**
     * @param compareFunc default compare function is (a - b) => number
     */
    public static arrayCompareBS<U>(arr: number[], element: number, 
                    compareFunc: Comparef, beg?: number, end?: number): number {
        beg = (beg ?? 0);
        end = (end ?? arr.length - 1);
        /* search to find element */
        while (beg! < end) {
            /* returns element > 0 and < 0 */
            let k = (end + beg!) >> 1;
            let endd = compareFunc(element, arr[k]);
            if (endd > 0) {
                beg = k + 1;
            } else if (endd < 0) {
                end = k - 1;
            } else {
                return k;
            }
        }
        return (-beg!) - 1;
    }

    public static binarySearch<U>(arr: U[], element: U, 
                    compareFunc?: (a: number, b: number) => number, beg?: number, end?: number) {
        beg = (beg ?? 0);
        end = (end ?? arr.length - 1);
        /* search to find element */
        compareFunc = compareFunc ?? ((a: number, b: number) => a - b);
        while (beg! < end) {
            /* returns element > 0 and < 0 */
            let k = (end + beg!) >> 1;
            let endd = compareFunc!(hashCode(String(element)), hashCode(String(arr[k])));
            if (endd > 0) {
                beg = k + 1;
            } else if (endd < 0) {
                end = k - 1;
            } else {
                return k;
            }
        }
        return (-beg!) - 1;
    }
}

/// refernce path = "@/license"


function hashCode(s: string) {
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function getMiddle(num: number): number {
    return Math.floor(num / 2);
}


export class BSDictionary<K, V>  {
    private kvElements: SynchedArray<[number, K], V>;

    private size: number;

    public set(key: K, value: V): void {
        // this.kvElements.add(key, value);
    }

    private bSearch(key: K): number {
        let hashc = this.getHash(key);
        let mid: number = this.getHashAt(getMiddle(this.size));
        return 0;
    }

    private getHashAt(index: number): number {
        return this.kvElements[index][0]; /* number */
    }

    private getString(o: any): string {
        if ("toString" in o && typeof o.toString === "function") {
            return o.toString();
        } else {
            return String(o);
        }
    }

    private getHash(o: any): number {
        let hashc: number = hashCode(this.getString(o));
        return hashc;
    }
}



/**
 * A util toolbox contains useful unit-convert tools
 * Supports:
 * 
 * Distance
 * ---
 * Temperature
 * ---
 * Time
 * ---
 * Mass
 * --- 
 * Storage
 * ---
 * etc.
 * 
 * Create to convert between multiple different unit of measures.
 * 
 * @author Cflower
 */
 export class Measure {
    /**
     * lightyear, au, km, meter, dm, cm, mm, µm, nm
     * ---
     * use meter as default unit, meter is the international measure unit,
     * not too big or too small.
     * 
     * meterTo** is convert meter to target unit
     * get** is convert targted unit to meter
     */
    public static readonly DistanceUnit = class {
        public static meterToLY(meter: number): number {
            return (meter / (9.461e+15));
        }

        public static meterToAU(meter: number): number {
            return (meter / (1.496e+11));
        }

        public static meterToKM(meter: number): number {
            return (meter / 1000);
        }

        public static meterToDM(meter: number): number {
            return (meter * 10);
        }

        public static meterToCM(meter: number): number {
            return (meter * 100);
        }

        public static meterToMM(meter: number): number {
            return (meter * 1000);
        }
        
        public static meterToUM(meter: number): number {
            return (meter * 1000000);
        }

        public static meterToNM(meter: number): number {
            return (meter * 1e+9);
        }


        public static getLY(unit: number): number {
            return (unit * (9.461e+15));
        }

        public static getAU(unit: number): number {
            return (unit * (1.496e+11));
        }
        
        public static getKM(unit: number): number {
            return (unit * 1000);
        }

        public static getDM(unit: number): number {
            return (unit / 10);
        }

        public static getCM(unit: number): number {
            return (unit / 100);
        }

        public static getMM(unit: number): number {
            return (unit / 1000);
        }

        public static getUM(unit: number): number {
            return (unit / 1000000);
        }

        public static getNM(unit: number): number {
            return (unit / (1e+9));
        }

        private static oc(): number {
            return 0;
        }
    }

    /**
     * C, F, K
     * --- 
     * use kelvin as default unit, kelvin is the international measure unit,
     * not too big or too small, start at absolutely zero of celsius.
     */
    public static readonly TemperatureUnit = class {
        public static getCelsius(unit: number): number {
            return (unit + (273.15));
        }

        public static getFahrenheit(unit: number): number {
            return ((unit + 459.67) * (5 / 9));
        }

        public static toCelsius(unit: number): number {
            return (unit + (-273.15));
        }

        public static toFahrenheit(unit: number): number {
            return (1.8 * (unit - 273) + 32);
        }

        public static celToFah(unit: number): number {
            // return (this.toFahrenheit(this.getCelsius(unit)));
            return ((1.8 * unit) + 32);
        }

        public static fahToCel(unit: number): number {
            // return (this.toCelsius(this.getFahrenheit(unit)));
            return (((unit - 32) * 5) / 9)
        }
    }

    public static readonly TimeUnit = class {
        
    }

    public static readonly MassUnit = class {
        
    }

    public static readonly StorageUnit = class {

    }
}
