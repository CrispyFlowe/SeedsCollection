

type Comparef = <A, B>(a: A, b: B) => number; 

function hashCode(s: string) {
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


export class BinarySearch {

    public static arraySearchBS<U>(arr: U[], element: U, 
                                beg: number, end: number): U | undefined {
        if (beg > end) {
            return void(0);
        }
        let mids = Math.floor((beg + end) / 2);

        if (arr[mids] === element) {
            return element;
        }

        if (arr[mids] > element) {
            return (this.arraySearchBS(arr, element, beg, mids - 1));
        } else {
            return (this.arraySearchBS(arr, element, mids + 1, end));
        }
    }

    public static arrayBS<U>(arr: U[], element: U, beg: number, end: number): boolean {
        return (this.arraySearchBS(arr, element, beg, end) != void(0));
    }

    public static arrayIndexBS<U>(arr: U[], element: U, beg: number, end: number): number {
        if (beg > end) {
            return -1;
        }
        let mids = Math.floor((beg + end) / 2);

        if (arr[mids] === element) {
            return mids;
        }

        if (arr[mids] > element) {
            return (this.arrayIndexBS(arr, element, beg, mids - 1));
        } else {
            return (this.arrayIndexBS(arr, element, mids + 1, end));
        }
    }

    // "toString" in arr[i]

    public static arrayElementBS<U>(arr: U[], element: U, 
                            compareFunc?: Comparef, beg?: number, end?: number): number {
        let num: number[] = [];
        for (let i = 0; i < arr.length; ++i) {
            if ("toString" in arr[i]) {
                // @ts-ignore
                num.push(hashCode(arr[i].toString()));
            }
            num.push(hashCode(String(arr[i])));
        }
        // @ts-ignore
        compareFunc = compareFunc ?? ((a: number, b: number) => (a - b));
        
        return (BinarySearch.arrayCompareBS(
            // @ts-ignore
            num, hashCode(String(element)), compareFunc, beg, end
        ));
    }

    /**
     * @param compareFunc default compare function is (a - b) => number
     */
    public static arrayCompareBS<U>(arr: number[], element: number, 
                    compareFunc: Comparef, beg?: number, end?: number): number {
        beg = (beg ?? 0);
        end = (end ?? arr.length - 1);
        /* search to find element */
        while (beg! < end) {
            /* returns element > 0 and < 0 */
            let k = (end + beg!) >> 1;
            let endd = compareFunc(element, arr[k]);
            if (endd > 0) {
                beg = k + 1;
            } else if (endd < 0) {
                end = k - 1;
            } else {
                return k;
            }
        }
        return (-beg!) - 1;
    }

    public static binarySearch<U>(arr: U[], element: U, 
                    compareFunc?: (a: number, b: number) => number, beg?: number, end?: number) {
        beg = (beg ?? 0);
        end = (end ?? arr.length - 1);
        /* search to find element */
        compareFunc = compareFunc ?? ((a: number, b: number) => a - b);
        while (beg! < end) {
            /* returns element > 0 and < 0 */
            let k = (end + beg!) >> 1;
            let endd = compareFunc!(hashCode(String(element)), hashCode(String(arr[k])));
            if (endd > 0) {
                beg = k + 1;
            } else if (endd < 0) {
                end = k - 1;
            } else {
                return k;
            }
        }
        return (-beg!) - 1;
    }
}
