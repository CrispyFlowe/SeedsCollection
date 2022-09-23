


export class RangeNumber {


    public get count(): number {
        return this.counting;
    }

    public set count(value: number) {
        let overflow: number;
        if (this.direction == 1 && (this.counting + value) > this.maxBound) {
            overflow = (this.maxBound - ((this.counting + value) - this.maxBound));
            // count 7, add 5, max 10, result 8
            this.counting = overflow;
        } else if (this.direction == -1 && (this.counting - value) < this.minBound) {
            
        }
    }


    public constructor(maxBound: number) {
        this.minBound = 0;
        this.maxBound = maxBound;
    }

    private counting: number = 0;
    private direction: 1 | -1 = 1;

    private minBound: number;
    private maxBound: number;
}




