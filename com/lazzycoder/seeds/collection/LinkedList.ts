/// <reference path = "./../base/copyright/License.ts" />

import { List } from "./List";


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


/*         

{
    curr: e1,
    next: {
        // addNode
        curr: e2,
        ! next: void(0)
        next: createNode => {
            curr: e3,
            next: void(0)
        }
    }
}

{
    curr: e1,
    next: {
        curr: e2,
        next: {
            curr: e3,
            next: {
                ...
            }
        }
    }
}
*/





