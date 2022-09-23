/// <reference path = "./../base/copyright/License.ts" />

/* Header initialize */
if (typeof window.Map == "undefined") {
    interface Map<K, V> {
        clear(): void;
        /**
         * @returns true if an element in the Map existed and has been removed, 
         * or false if the element does not exist.
         */
        delete(key: K): boolean;
        /**
         * Executes a provided function once per each key/value pair in the Map, 
         * in insertion order.
         */
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        /**
         * Returns a specified element from the Map object. If the value that 
         * is associated to the provided key is an object, then you will 
         * get a reference to that object and any change made to that object 
         * will effectively modify it inside the Map.
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

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, 
                    thisArg?: any): void {
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


