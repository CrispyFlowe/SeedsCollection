/// <reference path = "./../base/copyright/License.ts" />

import { AbstractCollection } from "./AbstractCollection";

/**
 * Stack
 * ---
 * Stack is a bucket of element, Put at top and remove at top.
 * Stack is always a very typical example of LIFO: Last In First Out
 * 
 * CPU always use stacks
 * 
 * Stack usually use for storing events ex: call-stack, memory-stack etc.
 * Call stack is the most popular uses of stack
 * 
 * @example
 * Here is an example of Stack: 
 *  push    pop
 * |           |
 * | 333333333 |
 * | 222222222 |
 * | 111111111 |  
 * |___________|
 * 
 * MORE EXAMPLES:
 * 
 * A stack(like a bucket)
 * |           |
 * |           |
 * |           |
 * |           |  
 * |___________|
 * 
 * push(1, 2, 3)
 * 1 comes in first, then 2 and 3
 * |           |
 * | 333333333 |
 * | 222222222 |
 * | 111111111 |  
 * |___________|
 * 
 * pop()
 * the top of stack is poped
 * |           |
 * |           |
 * | 222222222 |
 * | 111111111 |  
 * |___________|
 * 
 * push(4)
 * element added at the top of stack
 * |           |
 * | 444444444 |
 * | 222222222 |
 * | 111111111 |  
 * |___________|
 * 
 * 
 * For more information, 
 * see the documentation https://www.lazzycoder.com/projects/seeds/doc
 * 
 * @author Cflower
 */
export interface Stack<T> extends AbstractCollection<T> {

    /**
     * Pushes element on the top of stack.
     * @param element the element to be pushed
     * @return {boolean} true if the element was pushed or false if it is undefined.
     */
    push(element: T): boolean;
    
    /**
     * Removes the object on the top of stack and returns it.
     * @return {T | undefined} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    pop(): T | undefined;

    peekFirst(): T | undefined;


    /**
     * Looks at the object at the top of this stack, but not removes it
     * 
     * @return {T | undefined} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    peekLast(): T | undefined;

    /**
     * Returns true if this stack contains the specified element.
     * 
     * @param {T} element element to search for.
     * 
     * @return {boolean} true if this stack contains the specified element,
     * false otherwise.
     */
    includes(element: T): boolean;

    get(index: number): T | undefined;


    /**
     * Run the provided function, and iterate over stack from top to bottom.
     * 
     * @param {(value: T) => void} callbackfn function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     * 
     * @param thisArg argument to pass in(this 'this' value). Use arrow functions to
     *                prevent it. Function automatically point self.
     */
    forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}



export class Stack<T> implements Stack<T> {

    private arraydata: T[];

    push(element: T): boolean {
        this.arraydata.push(element);
        return true;
    }

    pop(): T | undefined {
        return this.arraydata.pop();
    }

    peekFirst(): T | undefined {
        return this.arraydata[0];
    }

    peekLast(): T | undefined {
        return this.arraydata[this.arraydata.length - 1];
    }

    get(index: number): T | undefined {
        return this.arraydata[index];
    }

    forEach(callbackfn: (value: T) => void, thisArg?: any): void {
        this.arraydata.forEach(callbackfn, thisArg);
    }
}

