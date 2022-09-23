
import { List } from "../List";

export class ArrayUtil {
    public static toList<T>(arr: T[]): List<T> {
        throw new Error("Method not implemented.");
    }

    public static takeout<T>(arr: T[], index: number): T | undefined {
        arr[index] = arr[arr.length - 1];
        return arr.pop();
    }
    
    public static insert<T>(arr: T[], index: number, element: T): T {
        arr.splice(index, 0, element);
        return element;
    }

    public static arraycopy<T>(src: T[], srcPos: number, 
                                dest: T[], destPos: number, len: number): T[] {
        if (this.getVersionInfo(src) < 6.0) {
            return dest;
        }
        dest.length = destPos;
        dest.concat(src.slice(srcPos, srcPos + len));
        return dest;
    }

    // let end: number = Math.min(srcPos + len + 1, src.length);

    public static getVersionInfo<T>(arr: T[]): number {
        return 0.00;
    }

    public static copyOf<T>(arr: T[]): T[] {
        return arr.slice(0);
    }

    public static copyOfRange<T>(arr: T[], start?: number, end?: number): T[] {
        return arr.slice((start ?? 0), (end ?? (arr.length - 1)));
    }

    public static clear<T>(arr: T[]): void {
        arr.length = 0;
    }

    public static frequency<T>(arr: T[], searchElement: T): number {
        let i: number, j: number, l: number;
        for (i = 0, j = 0, l = arr.length; i < l; ++i) {
            if (arr[i] === searchElement)
                ++j;
        }
        return j;
    }
}



