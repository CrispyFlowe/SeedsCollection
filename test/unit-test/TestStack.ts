

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
 interface Stack<T> {

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



class Stack<T> implements Stack<T> {

    private arraydata: T[] = [];

    public push(element: T): boolean {
        this.arraydata.push(element);
        return true;
    }

    public pop(): T | undefined {
        return this.arraydata.pop();
    }

    public peekFirst(): T | undefined {
        return this.arraydata[0];
    }

    public peekLast(): T | undefined {
        return this.arraydata[this.arraydata.length - 1];
    }

    public get(index: number): T | undefined {
        return this.arraydata[index];
    }

    public forEach(callbackfn: (value: T) => void, thisArg?: any): void {
        this.arraydata.forEach(callbackfn, thisArg);
    }


    public get length(): number {
        return this.arraydata.length;
    }
}


const s = new Stack<number>();

for (let i = 0; i < 1000; ++i) {
    s.push(i);
}

// should be 1000
console.log(s.length);

// should be 999
console.log(s.pop());

// should be 0
console.log(s.peekFirst());

// should be 998
console.log(s.peekLast());



// if nothing is happen, means unit test success! Congratulations!


// test-link: https://www.typescriptlang.org/play?target=2#code/FDD0Cp2ACdoZQC4EMDGBrGcC0usJQ2gEsBnaZaAIwFcMBTRaAewDNp6AbegW3oDtEAGmgAFGk2RNEzAA4V+AE2gAnXswBu9CtLkA6fEjToS5ZJwDuyAJ5noWldeiJrs4qnMcAHsh6zuLOwAMgCSAGIA8gBc0EHIpEwh-NBhxCoJ0BES+PgAwqIAqhSWNuQ0pNoJxqQ5sATG0OU05pxO5dqszCrQCV3E-ADmHFqC5PReMR6cnNhVGCJ8PF3Ws4QmjKgGdbktPWumzgAW2ksZsnI0nMjd7eRse8a1cAAC477+9PgAEvRqB8jJN5+AL3IwYGL4aCycqHaBwqFyfAAH3hqNRSOR0AAzDjcbjoBi6iiAEykslkgmYgCMNNptIJcORAH0Way2UzCXB8ABZCIAJQAotABQANACC3NEQQF8CiT2gYoeGAAFJxiOhtJRaAxEABKTFotGchmG9EG01w40oi2WxlE9kO434aGkQ7KqkiYkiLH6upU6CoZh8cj9aCsNIJESIY7JYkKZRY80Wq3YvF4ylE6Dk7MZuAoukFk3Mh1sp11c6yZW+uDR7QyeT3OYmMgI2T0RRJ00pm25hnZ8m9-MF+nW4slllluAut0AFmrHG4fEEFEUinbOiOdbkgSVmEzPZTM6Px+Pg6z-dJZ+HI7tefHrMn0HwYS60CWf36nRUPCkxGY-BEfAKjrY5oEUZhUBoJcUEQP9kkORBEFkUgolAUALAwvQrgAL2w6xAzXFQ9EDHhQFkFRmAAK3oVBEFIUBgMUejwNQeVnmQCRDlfXJWE4ZgLF+LBQGAfpEF+Vg0G0MF0AAHgAFQAPmgABvEBUQgKA0TgcRXXoMZFwEJh-03Zxt0bNYtlRF5ZGuXwF14QyTK4BzlxkahtGndsYCs6BnjURAaBUZJlKoZhmG4AEAF9nBUGhtGIdha3s6DoCschPOUV8JM4CoSHYYgmBbGglHocN+HbSz4XAYTUWnZVnOgmI5N1GJQvC+gAQAbm8u14Q0nq4TgPl1C0cgkuYKhqNolhkiS+sdybeNVEYQL+BDRBKsG3z-NWlS5IZYq1zK9tovGyaaMkaRQPm+5oxbRbX0O0r+nXBLNwGupFpbXhZBcTbYBq+EKyrJqDpK47FG6ga23odBUnSRAQegfaUSeiGoYG-qtNiML0DMK7tAmqbLpMm7EsOe61hEWgmH4ZgmDUJZRpIRAPq5bG-JWoK9rBo6XsUU7QKJi6NzmszycphpHvB-m8ve7GvrGPw-rZwG4Rh9A4gSJGUcaGXyshtS+sgNnoGGgKgrG2L4ol8hFsDQRkH6MbQNINtUAS4h1wawz-vZnznhslQ7OUuTop95cI90HoOpUVBYS-P2nw5nbuZCsKIv4U7rblu67f2B2UGdky3Zoz3vYMwQhFN7Lcvp44VAsMh6D9tWSH4VBOBoNdSHqyvECalrqAzjr+Ch1EBkYZV+jXCZoH4KCqF+IfdbR-mMfUk3sb5YqTPIzRiDXZRWGK2i4JEAFlAK34pEJhxdzDCieFM+Q3NCxCgyT03A9s5-lOVDQ5g4qD2gAAXiUhoZgh9opTE4FQYwrBkgnw7rBYyblxg0QkPQEQBVTCm36JAjUygm7RhmpqFQAwoKGRiElKO9ggHYNMtQNQyATBJWvsHVByRrDMBoAGAEps5BcJaE4VOSDzAVC-hzIOdk85igoRQChVDXLMChPEEM-BlR52gAAcjzjo+hXd6C6j0NAAouVrgUQsGGU+XCxrMFNj2NE5F6AjEKhtFIti4IUAkEGX8sCnDnFEjHTgrBW4DS-AKNAbpYHwIwIgmIACGEgPAfYKBigowU1IPIgYAB+GIAJrBD0gYfbqkUQAgE7uo+oGB5JKWIMCFydEamyUUipI26sVDEEAWJRRwdrCKCkMgJqABtAAumA6A4zx5AxoFQNUqAoQwj7k0werUR4AnaRaPOehLE2EGSgPQdUo66m6haMRMU4pnPhOU6GcyFmth1rzZ6BstmmguTsvZAyhlHLkFWa5cJbm1Xue4KE9BYbw21ivZ5EM3mGg+Vk3ZKh+kHOQCMgADGMgF0AgWzPmaCjWWtEbQtRvrdcqlzlc1moir5qKRmfORfsn53BBikOwNAKkWKBq4vViCxZk9EYz3GDEBePAl4qBJXrPmryKXvKpUcMgSKUVDJGUKrwXLUQ8qWfixZkTonKliQg-giTAFGJSRA9JmSyA5PyQoIpMQSnKFlYaBlyrDl6vjgalocT0CIKtdkihpzuUVOBTq6AAroAsoGNGJGorxVwrRAixVtLmUCGjYcbF5TbnAAdhkcgoD570GsdJGScbfgKX+SAL80BVSMBIJM9FnV60yQ5eittTaADUHbiC6gTaQI5yye1lJAGhHoXFLjKCXq2ttOb-ykHalhZgAxlT9qjdGINYBQBjt4ZwSd2gACch7Z1rQXXxZd-bga6g3aO10O693QHRce+d3BF3nqOeCuGEZiXXq3beid7loCHoABxPtPUuld77YZEqrBukdW63p0zuoMA4hxkCyDbABN8o8yj8FwWJPNdBUB6VIAAQmgLkf8AxOGXF-HOkjFSgA