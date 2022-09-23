


export class DisUtil {
    public static getVersionInfo(): string {
        return "JavaScript, EcmaScript " + 
                this.getVersion() +
                 ", ES" + String(2009 + this.getVersion());
        // ex: 6.0, ES2015
    } 

    public static getVersion(): number {
        return this.testVersion();
    }

    private static testVersion(): number {
        switch (true) {
            case (typeof window.Object.fromEntries !== "undefined"): {
                return 10.0;
            }
            case (typeof window.Object.entries !== "undefined" 
                    && typeof window.Object.values !== "undefined"): {
                return 8.0;
            }
            case (typeof window.Set !== "undefined" && typeof window.Map !== "undefined"): {
                return 6.0;
            }
            case (typeof window.Object.defineProperty !== "undefined"): {
                return 5.0;
            }
            default: {
                return 3.0;
            }
        }
    }
}




