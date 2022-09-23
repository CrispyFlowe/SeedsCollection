/// <reference path = "./../base/copyright/License.ts" />

export class Pair<A, B> {
    public elementA: A;
    public elementB: B;

    public constructor(elementA: A, elementB: B) {
        this.elementA = elementA;
        this.elementB = elementB;
    }

    public getA(): A {
        return this.elementA;
    }

    public getB(): B {
        return this.elementB;
    }

    public get A(): A {
        return this.elementA;
    }

    public get B(): B {
        return this.elementB;
    }
}



