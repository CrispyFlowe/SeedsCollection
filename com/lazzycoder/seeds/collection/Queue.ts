/// <reference path = "./../base/copyright/License.ts" />

import { AbstractCollection } from "./AbstractCollection";

/**
 * Queue
 * ---
 * Queue is a lining-up of elements by order, this Queue is implemented
 * as use of a Deque. Queue is always a very typical example
 * of FIFO: First In First Out
 * 
 * Here is an example of Queue:
 * addFirst(element in) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] => pollLast(element out);
 * 
 * For more information, 
 * see the documentation https://www.lazzycoder.com/projects/seeds/doc
 * 
 * @author Cflower
 * 
 * @see ArrayQueue
 */
export interface Queue<T> extends AbstractCollection<T> {
    /**
     * Inserts the specified element at the front of this deque if it is
     * possible to do so immediately without violating capacity restrictions
     *
     * @param element the element to add
     */
    addFirst(element: T): boolean;

    /**
     * Inserts the specified element at the end of this deque if it is
     * possible to do so immediately without violating capacity restrictions,
     * available.
     *
     * @param element the element to add
     */
    addLast(element: T): boolean;

    /**
     * Retrieves, but does not remove, the first element of this deque,
     * or returns {@code undefined} if this deque is empty.
     *
     * @return the head of this deque, or {@code undefined} if this deque is empty
     */
    peekFirst(): T | undefined;

    /**
     * Retrieves, but does not remove, the last element of this deque,
     * or returns {@code undefined} if this deque is empty.
     *
     * @return the tail of this deque, or {@code undefined} if this deque is empty
     */
    peekLast(): T | undefined;

    /**
     * Retrieves and removes the first element of this deque,
     * or returns {@code undefined} if this deque is empty.
     *
     * @return the head of this deque, or {@code undefined} if this deque is empty
     */
    pollFirst(): T | undefined;

    /**
     * Retrieves and removes the last element of this deque,
     * or returns {@code undefined} if this deque is empty.
     *
     * @return the tail of this deque, or {@code undefined} if this deque is empty
     */
    pollLast(): T | undefined;

    remove(index: number): T | undefined;

    /**
     * Returns the length of this Queue
     */
    get length(): number;
}
