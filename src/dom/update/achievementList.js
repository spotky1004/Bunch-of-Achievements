import DomCache from "../create/_index.js";
import Achievements from "../../data/achievements.js";
import SaveData from "../../types/saveData.js";

const AchievementElements = DomCache.AchievementList;



/**
 * @param {SaveData} saveData 
 */
export function ProgressDisplay(saveData) {
    for (const key in AchievementElements) {
        const _Achievement = Achievements[key];
        const _Cache = AchievementElements[key];

        const diff = 5*(1 - _Achievement.progress);
        _Cache.item.style.background = `background(
            90deg,
            rgb(3, 16, 94) ${_Achievement.progress-diff}%,
            #0008 ${_Achievement.progress}%
        )`;
    }
}
