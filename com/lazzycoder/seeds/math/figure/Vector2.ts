import { Types } from "../../typing/types";


interface Surface {
    w: number;
    h: number;
}

export class Vector2 {
    private xPos: number;
    private yPos: number;
    private surf: Surface;

    public constructor(x: number, y: number, surf: Surface);

    public constructor(x: number, y: number, w: number, h: number);

    public constructor(...args: any[]) {
        if (Types.matches(args, ["number", "number", "number", "number"])) {
            /* x, y, w, h */
            this.xPos = args[0];
            this.yPos = args[1];
            this.surf.w = args[2];
            this.surf.h = args[3];
        } else {
            this.xPos = args[0];
            this.yPos = args[1];
            this.surf = args[2];
        }
    }

    public get left(): number { 
        return this.xPos;
    }

    public get right(): number {
        return this.xPos + this.surf.w;
    }

    public get top(): number {
        return this.yPos;
    }

    public get bottom(): number {
        return this.yPos + this.surf.h;
    }
}






