import { DomCache, EventData, EventWork } from "./dom/init.js";
import IsaveData from "./types/saveData.js";

/**
 * @param {IsaveData} saveData 
 * @param {string} key 
 */
function save(saveData, key="BunchOfAchievements_TestSave") {
    saveData
}

function updateAll() {
    
}

let lastTime = new Date().getTime();
/**
 * @param {number} dt 
 */
function gameTick() {
    const dt = new Date().getTime() - lastTime;

    for (const name in EventWork) {
        EventWork[name]();
    }

    requestAnimationFrame(gameTick);
}
requestAnimationFrame(gameTick);