/// refernce path = "@/license"

import { BinarySearch } from "./BinarySearch";
import { SynchedArray } from "./SynchedArray";


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


