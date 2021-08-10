import Achievements from "../data/achievements.js";
import UpdateFuncParams from "../types/updateFuncParams.js";

/**
 * @param {UpdateFuncParams} obj
 */
export function UpdateProgress({ saveData }) {
    for (const key in Achievements) {
        Achievements[key].check(saveData);
    }
}