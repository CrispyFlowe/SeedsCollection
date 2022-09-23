
/// Graph.ts unit test 

// load test stuff
function defined(obj: any) {
    return (obj != void(0));
}

export interface VerticalGraph {
    r?: number;
    c?: number;
}

type SpecifiedVertGraph = [number, number];

export interface Graph<T> {
    toArray(): T[];

    add(element: T): boolean;

    remove(index: number): T;
    
    clear(): void;

    removeIf(filter: (element: T) => boolean): number;

    get(r: number, c: number): T;

    getArray(specified: VerticalGraph): T[];

    indexOf(element: T, specified?: VerticalGraph): number;

    includes(element: T, specified?: VerticalGraph): boolean;

    forEach(callbackfn: (element: T) => void, thisArg?: any): void;

    some(callbackfn: (element: T) => void | boolean, thisArg?: any): boolean;
    
    get length(): number;
}

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

class StraightGraph<T> {

    public static readonly REMOVED = {};

    private columnLen: number;
    private size: number;
    private elements: T[];

    
    public constructor(columnLen: number);

    public constructor(elements: T[] | StraightGraph<T>);

    public constructor(...args: any[]) {
        if (Types.matches(args, ["number"])) {
            this.columnLen = args[0];
            this.elements = [];
            this.size = 0;
        } else {
            if (args[0] instanceof Array<T>) {
                this.columnLen = 30;
                this.elements = args[0];
                this.size = this.elements.length;
            } else if (args[0] instanceof StraightGraph<T>) {
                this.columnLen = args[0].columnLen;
                this.elements = args[0].elements;
                this.size = this.elements.length;
            } else {
                this.columnLen = 30;
                this.elements = [];
                this.size = 0;
            }
        }
    }

    public toArray(): T[] {
        return this.elements;
    }

    public add(element: T): boolean {
        this.elements[this.size++] = element;
        return true;
    }

    public remove(index: number): T {
        var removed: T = (this.elements.splice(index, 1))[0];
        return removed;
    }

    public clear(): void {
        this.elements.length = 0;
        this.size = 0;
    }

    public removeIf(filter: (element: T) => boolean): number {
        let i: number, j: number, len: number, s: number = this.elements.length;
        for (i = 0, j = 0, len = this.elements.length; i < len; ++i) {
            if (!filter(this.elements[i])) {
                this.elements[j++] = this.elements[i];
            }
        }
        this.elements.length = this.size = j;
        return (s - j);
    }

    public get(r: number, c: number): T {
        let ptr: number = (r + (c * this.columnLen));
        return this.elements[ptr];
    }

    public getArray(specified: VerticalGraph): T[] {
        let eSet: T[] = [];
        if (defined(specified.r)) {
            for (let searchn = specified.r!, len = this.size; 
                            searchn < len; searchn += this.columnLen) {
                eSet.push(this.elements[searchn]);
            }
            return eSet;
        } else if (defined(specified.c)) {
            let beg = (specified.c!) * this.columnLen;
            /* get copy of entire column */
            eSet = this.elements.slice(beg, beg + this.columnLen);
            return eSet;
        } else {
            /* if defined both r, c or both not defined */
            return eSet;
        }
    }


    public indexOf(element: T, specified?: VerticalGraph | undefined): number {
        if (defined(specified)) {
            let spec = this.getArray(specified!);
            return spec.indexOf(element);
        } else {
            return (this.elements.indexOf(element));
        }
    }


    public includes(element: T, specified?: VerticalGraph | undefined): boolean {
        if (defined(specified)) {
            return this.indexOf(element, specified) >= 0;
        } else {
            return (this.elements.indexOf(element) >= 0);
        }
    }

    public forEach(callbackfn: (element: T) => void, thisArg?: any): void {
        this.elements.forEach(callbackfn, thisArg);
    }
    
    public find(callbackfn: (e: T) => boolean | void, thisArg?: any): T | undefined {
        return this.elements.find(callbackfn, thisArg);
    }

    public some(callbackfn: (element: T) => boolean | void, thisArg?: any): boolean {
        return this.elements.some(callbackfn, thisArg);
    }

    public get length(): number {
        return this.size;
    }

    private elementAt(r: number, c: number): number {
        return (r + (c * this.columnLen));
    }
}




const g = new StraightGraph<number>(30);


// g.add(30);
// console.log(g);

for (let i = 0; i < 1000000; ++i) {
    g.add(i);
}

// should be 1000000
console.log(g.length);

// should be true
console.log(g.includes(1000));

// should be false
console.log(g.includes(300000000));

// should be 3000
console.log(g.indexOf(3000));

// usually be true, 1000001
console.log(g.add(0), g.length);

// should be 1, 3
console.log(g.remove(1), g.remove(2));

// usually be a big array, 33334
console.log(g.getArray({r: 3}).length);

// should be a array [92 to 121], and length is 30
console.log(g.getArray({c: 3}), g.getArray({c: 5}).length);

// should remove batch of elements, and filtered length should be 100
console.log(g.removeIf(n => n > 100), g.length);

// should be undefined, 33
console.log(g.get(300, 50), g.get(1, 1));

// out of bound get test, and is empty array [] in order
g.removeIf(n => n > 10);
console.log(g.getArray({c: 100}));

// should gives array [0 to 10, and 0 at the end]
console.log(g.toArray());

// should be 0
g.clear();
console.log(g.length);


// if nothing is happen, means unit test success! Congratulations!

// test-link: https://www.typescriptlang.org/play?target=2&module=1#code/FAejAIHECcEMAcAWA6ALgZ3AVwHYEtVxUBTdVYCiAGwHtYATI0wsrAMzeDdwGNU8aOcPWJs8OYvQAUNAEYArAFzhYOAJ4BKcAG9g4feGjFUWaEJkLwAQgC84AG4080gAwaNAbmABfCsQAe8DTQhOIk0GywPMTgAGrEIXg8sFQwCIg6egbQAPzKOFgAtrIJXgbgPHngBcWlPhSoavAxAMrNPHhikvEhaUjgdgDaNSXQADTVRaMAul7AAUEh4GEJkdFQcEgAPAAqAHyZ5ag0AILQcGpSGso7g7MU5QzSxFTEhcQ4qDfX4LI0NK9VHNykZCjR7MQpOIRP58lMEj8dmUDFl9DxAdArspHM5gdk3uDiABJNhSMRUcLKKQvN4fL7gHZaGwHP4A4iqH4jOqo8AAc2MUmgcNq4wqwtGiLx+n5qDOFyk6HanTwkmUPX4yVSm0QiLuUuWOBhAHlSTT3p8bhNFcQOl16FV1UkUn0deLueVxOisCJ0NTXub6TsrUq7Q6EhrndqfqzATh9WxggBRKKIKSaqiyKIAazYOCpZrp3wGBxx9AmqEQeHQZ15VVUmmxTno+vQNHeaZSGezufz-sLDKZJab4AAPr9-rHy5Xq9Ba8p69GJ+y4zyeTLwK8cLyK1jJiKvL5gI1muAAArQPCFWDQNQ7JqkAbgKQ8gBEsjwvLCL9H4DfS9U35ji+ZAXlugG-ly0Dga+3A4HwAg4OBL5yPINqoEh6BqMUAJIbgIhiBI9AvsAnh+IEwSEOisDoJgd7NOguwHLo5TwFgshUEk4BkLAGrgFeqA8IgpBSMepDKHKsBqAAMngWbEFs9Z7BMPLlKpanqWiWBkG2xB0WJT7npe163vemBjgAYrw-CCD+IHiLydwaI5ygxsuhzqZ0T6iegyCbtuGS2HYPBacc7x6T5fkVhoKnqUYJhmOAkRUOgxDImpCbQE+ryhI+LgeMs4BbBUIU6eFvkfP5+UANRVXgWjMRpBieSJ940GwxXaWFpmDHg0wDDYdjAagoG8i+9UxY1yztWmJVdfRPV9YFRCte13kLdFk2TXFphCElKVpY13jgC8KVTU+wWdbp3W9Qa3FwcQbXgBJmjuZtBgZVlxjgPIuX5T9RUXaFV3zb15VbhW1VVfI41vRpEAAAIYAAtB+ODBMQE2w81M2XeFC2DPI0xaOIy0g0Tr2wxpPCCPwBSpZjb1HSdMQNZTGnbQle302zqm+DzfObUzyUswz6kgAAVKTD3tYDpX3ssmCWXB1lCOLICi2pzVWC1ZO3agqjRI9ONA3jN3UeASvwYI7haBrjUS2da03fQNAPmjhD8YJHUm-eC3gGrdvs8YO2JSk+12wLamR6pHNCMNWDcwYh4sWxHE8Fx+u8Z7iAnKgUnsmQVw6NHDwGKx7GcdxvHoKjBCmJCMPqTyydl6nleZ5xMoAMLUcJnLwplrMx8HCV5c3pf6OXacZzxnGEtAtAMLukEUyCI9CGP5S+IeVE0eALTDbAH6IKgLqMZkPJT+3s-p0YDCCFQajgAASomACyRqxImAAij7aN4+p4AXnsDxGI1MqBFBwPnPMe5RgHSAXgEBJAuJ4AAF7EDdNAeBwDQHHT7J8dANw9QT3AJfNu6dqY4BAlgPgwQ0wAkgdAzBpEyEVwoYIahtDMQFgIUQvqY4D5wGPqfbUjEWEpzYRUDh8cuFSGQPI68vJCEqHUI5VeTVpplWzsJRR6AJiDBfJBF8RNG6TQrFWZA4DGEfEfLowYLh7hvXMT5HhGBHzEKcdOZANd0G-UxkLU6Q8NLNTsQ4vWBtpZPXOJJMR6izFeKsYUKBNi7AAGZN5s2ccgVxmA7ChMcZkrxPiYh2CyTksGlUI54NOiE2c6B7F9XEHdQ27VBFH15CfM++xTGwyyYk5JQg8l1IaZYhhSToEHU8RYnJtjhkOOyfgjAkzNpZOKY+MpiyIoVQhlU5mcTGp9LGQMx86TlnxOmZs9xBTKarLQSU8AGTJrRy3uPVh09jjPV3LcPqQT8TxTjl4nJB0W6T3ISoegzxFnfBcv+IQvz9AbNpAQwYtz0E1T6nYVxZzDDryINABOwKSFX1vgSCEUJDQBGYTcfZIDMqgkJPQaldgRKAs2d4+AadITQgCBMAAjO4Bp2LY44rBBCZsryJHT3ROyTEPxSz7MRQGLZ4MMh2EeapVF9z1UgvAMSkVhISRkjwBSBIvYkWBkHOONkHJMH7OyssTBEwlCwISBMTcjquK2tKay81yrKkaQ+lCXKTrg0bhSUQH1SqKkQwKkVTckM6r7I9NNKw5Jwgsoub69aPSpkuM2QTdF6zI10nqb1bFLyNLPIMIqkt0bVURosWsuw8ghW4oVOAJG31SIvLeZ3AUQoXWih4FShkdqvrwGGl6p8mUqrnX9g2ny-ToHuFbf8hdCys0TugNc8AOq9Uyk+daW0KpGVxHDE6LU6RdQ-Mxva4gLRjB8Kudi5q+FxCSAVCGE9yBoDuCTe9YIn0WAysEoMriX7JA-qsG68Nmr8qBzZila8oHCphrjFxEDiAhBVW9RYpdHwc2bXvcYZArF0CphrcipD0BQNE3LUnO2wriOoGxQEmIr7RDvukEe5UkGeB-vhape1JReSPk-TaXj9BLFWC0JLQ5EDxkfHo-oB265qbwCfo9OkeAjBSIU6rdWb1mNFszVG9AnKpAiYmCJ8As75PWJwN2zaTGH0sf8dUkWb0HaeTfYRccFZDATHToBv4AX3bCE435gOb0XPGFY683t6duX+BNH6c1lpwMSdDGqc9moXQ-jwpFyQ-cRT7I4wRD9PG7QCbtvao9JmfIHuiZcKrJ6ZPKZxWuo9yBkupdcU5qOHn-36GFRmvNvqesUpS6aRZK7-EJclZxT0ECfRpYDBl1rkgwyJDy9qArFKKv0EXNauFmNytcfE8e4rhG1LCqyb1mb5rgxZZPVoPYarWNDcE2vNdY2N1Roe2tukb21UDd5hK1ukiMrJkEh2KgXYeA5hgUDi0A5iwOCbFOKsNY6zqDlcOQTlGMDIGhymOHCOkdY5nLyMHJdFvpwItIdMmZEc9ifBgtHzIrWxh-KWKnOP5x4+pWOQrh39l3eLQQkn0Jycs8pwumstOiVgtbO2Zn3ZkeuKLFz1yqheeY4V7OXHDZuduUExL0ztbVeQnV6znA-PZxK8S3yL6kVUwldGOL3FcGIeTxwcg1xudBQeuHYOj3CQve-ZnXOuTCSjnLqV4eYAlCyB8kfBIAA7vvQ+wiz6QT2FIdJLCIC8mQE8QvbgvAQBT2yXyNBeRSBp3MQN9q8C-VjeAXlLhu894TT00v5e6oHkoCALiiAaBYCoIwEonee89+Txw2vtAG+l7d8X0f5GJ9T9+DEeOGMa+vDryvybXpVtd+73N0AG-x+T+nzELmC+qFL-r43k-K3hLpLnz3y-EBN+353+AJ-i4I-q2Ifsvq-oDkAT-qPlpFgJ2E-DPnvnyl-ryiAc-sfuXm4BMKvtsjqHML-jftvjPryhMKkmgWAS-qXvSmSvytgT+qSpCAAEzQHYDoBwHw4IExCwC-AfgqDNakGpKCEAAs5BxAR+r+TW8o2gA6qS3gGgda6+Y+W+d+KgfBFw4AgwAAnIwUQDQJ3owbytMBMKoIwG7grIAcAQfmIeAaXpIZJFINoKHrIRoHQXYZcI4coAAKxyEKH4HX7KH6oQi-A8RexaabLGGGiJTGrhCSBob+RKH-7EHd6iHiFUEMGGqDIHBCAHDn4uF8i+Ej4JFEExCi5cYCEpE2HIAygV4uATCeFYH5HVEkGd4sET6ECPR-B4Qu6EAkBkARGMBVjHSFATpPzXjqF3AGjgDBAiDQDABpGirEikiZHVDgA5GV4VGUFVHGCfIeGz4uByGKF-7b6fgQiYBjGSQaEuC6Gz79EPIqA9FCTHSGjTAbHH4fLNZXCHGEEqHAGl7SrXhXBeBWGpEFGFGeTuyVhbjmGIAIDND258TLiYC4AEBMCp5sE8DRA0RWDgBdyCC8hwAmBUCzwcJWDABAA

