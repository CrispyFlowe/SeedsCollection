/// <reference path = "./../base/copyright/License.ts" />

import { LinkedList } from "./LinkedList";
import { Queue } from "./Queue";


/**
 * @author Cflower
 * @see Queue
 */
export class ArrayQueue<T> implements Queue<T> {

    private elements: T[] = [];

    public addFirst(element: T): boolean {
        let p: number = this.elements.length;
        return (this.elements.unshift(element) - p > 0);
    }

    public addLast(element: T): boolean {
        let p: number = this.elements.length;
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


