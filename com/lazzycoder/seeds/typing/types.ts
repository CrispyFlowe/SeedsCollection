/// <reference path = "./../base/copyright/License.ts" />

type PrimaryTypes = (
    "bigint" | "boolean" | "string" | "number" | 
    "function" | "object" | "symbol" | "undefined"
);


export class Types<T> {
    public static matches(types: ArrayLike<any>, 
                            customeTypes: (PrimaryTypes | Function | string[])[]): boolean {
        if (types.length !== customeTypes.length)
            return false;
        for (let i = 0; i < customeTypes.length; ++i) {
            if (typeof customeTypes[i] === "string") {
                if (customeTypes[i] !== typeof types[i])
                    return false;
            } else if (customeTypes[i] instanceof Array) {
                for (let j = 0; j < customeTypes[i].length; ++j) {
                    // @ts-ignore
                    if ((customeTypes[i][j]) in types[i]) {
                        continue;
                    } else {
                        return false;
                    }
                }
            } else {
                /* typeof customeType is Function */
                if (!(types[i] instanceof (customeTypes[i] as Function))) 
                    /* if types[i] does not match customeType[i] */
                    return false;
            }
        }
        return true;
    }

    public static matchAtLeast() {}
    

    public static signiture() {
        
    }

    public static getCases(): number {
        return 0;
    }

    public static overload(): number {
        return 0;
    }
}


function overloads(type: string, count: number): any;

function overloads(type: string): any;

function overloads(count: number): any;

function overloads() {
    if (Types.matches(arguments, ["string", "number"])) {
        console.log("overload 1");
    }

    if (Types.matches(arguments, ["string"])) {
        console.log("overload 2");
    }

    if (Types.matches(arguments, ["number"])) {
        console.log("overload 3");
    }
}

