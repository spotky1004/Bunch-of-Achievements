import Decimal from "../../lib/decimal.mjs";

export default {
    // Progress
    /** @type {Decimal} */
    Point: new Decimal(0),
    /** @type {string[]} */
    Achievements: [],

    // Stat
    /** @type {number} */
    StartTime: new Date().getTime(),
}
