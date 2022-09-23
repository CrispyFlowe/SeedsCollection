import { AbstractCollection } from "./AbstractCollection";
import { ArrayUtil } from "./util/ArrayUtil";


export interface StaticArray<T> {}

export class StaticArray<T> implements AbstractCollection<T> {

    private arraydata: (T | undefined)[];

    public constructor(len: number) {
        this.arraydata = [];
        /* set array to specified length */
        this.arraydata[len + 1] = void(0);
        this.arraydata.length--;
    }

    public get(index: number): T | undefined {
        if (!this.checkRange(index))
            return void(0);
        return (this.arraydata[index] as T);
    }

    public set(index: number, value: T): T | undefined {
        if (!this.checkRange(index)) {
            console.error("Index out of range: " + index);
            return void(0);
        }
        let re = this.arraydata[index];
                 this.arraydata[index] = value;
        return re as T;
    }

    public toArray(): (T | undefined)[] {
        return this.arraydata;
    }

    public get length(): number {
        return this.arraydata.length;
    }

    private checkRange(index: number): boolean {
        return (index >= 0 && index < this.arraydata.length);
    }
}

