/// <reference path = "./../base/copyright/License.ts" />

import { Dictionary } from "./Dictionary"


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


