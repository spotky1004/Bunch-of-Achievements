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
        _Cache.title.style.background = `linear-gradient(
            90deg,
            rgb(3, 16, 94) ${_Achievement.progress*100-diff}%,
            #0008 ${_Achievement.progress*100}%
        )`;
    }
}
