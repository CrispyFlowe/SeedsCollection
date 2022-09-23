

import { Types } from "../../typing/types";



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






