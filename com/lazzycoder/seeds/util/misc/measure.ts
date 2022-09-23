

/**
 * A util toolbox contains useful unit-convert tools
 * Supports:
 * 
 * Distance
 * ---
 * Temperature
 * ---
 * Time
 * ---
 * Mass
 * --- 
 * Storage
 * ---
 * etc.
 * 
 * Create to convert between multiple different unit of measures.
 * 
 * @author Cflower
 */
export class Measure {
    /**
     * lightyear, au, km, meter, dm, cm, mm, µm, nm
     * ---
     * use meter as default unit, meter is the international measure unit,
     * not too big or too small.
     * 
     * meterTo** is convert meter to target unit
     * get** is convert targted unit to meter
     */
    public static readonly DistanceUnit = class {
        public static meterToLY(meter: number): number {
            return (meter / (9.461e+15));
        }

        public static meterToAU(meter: number): number {
            return (meter / (1.496e+11));
        }

        public static meterToKM(meter: number): number {
            return (meter / 1000);
        }

        public static meterToDM(meter: number): number {
            return (meter * 10);
        }

        public static meterToCM(meter: number): number {
            return (meter * 100);
        }

        public static meterToMM(meter: number): number {
            return (meter * 1000);
        }
        
        public static meterToUM(meter: number): number {
            return (meter * 1000000);
        }

        public static meterToNM(meter: number): number {
            return (meter * 1e+9);
        }


        public static getLY(unit: number): number {
            return (unit * (9.461e+15));
        }

        public static getAU(unit: number): number {
            return (unit * (1.496e+11));
        }
        
        public static getKM(unit: number): number {
            return (unit * 1000);
        }

        public static getDM(unit: number): number {
            return (unit / 10);
        }

        public static getCM(unit: number): number {
            return (unit / 100);
        }

        public static getMM(unit: number): number {
            return (unit / 1000);
        }

        public static getUM(unit: number): number {
            return (unit / 1000000);
        }

        public static getNM(unit: number): number {
            return (unit / (1e+9));
        }

        private static oc(): number {
            return 0;
        }
    }

    /**
     * C, F, K
     * --- 
     * use kelvin as default unit, kelvin is the international measure unit,
     * not too big or too small, start at absolutely zero of celsius.
     */
    public static readonly TemperatureUnit = class {
        public static getCelsius(unit: number): number {
            return (unit + (273.15));
        }

        public static getFahrenheit(unit: number): number {
            return ((unit + 459.67) * (5 / 9));
        }

        public static toCelsius(unit: number): number {
            return (unit + (-273.15));
        }

        public static toFahrenheit(unit: number): number {
            return (1.8 * (unit - 273) + 32);
        }

        public static celToFah(unit: number): number {
            // return (this.toFahrenheit(this.getCelsius(unit)));
            return ((1.8 * unit) + 32);
        }

        public static fahToCel(unit: number): number {
            // return (this.toCelsius(this.getFahrenheit(unit)));
            return (((unit - 32) * 5) / 9)
        }
    }

    public static readonly TimeUnit = class {
        
    }

    public static readonly MassUnit = class {
        
    }

    public static readonly StorageUnit = class {

    }
}


