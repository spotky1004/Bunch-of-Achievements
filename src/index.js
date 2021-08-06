import { DomCache, EventData } from "./dom/init.js";
import IsaveData from "./types/saveData.js";

window.EventData = EventData;

/**
 * @param {IsaveData} saveData 
 * @param {string} key 
 */
function save(saveData, key="BunchOfAchievements_TestSave") {
    saveData
}

setInterval(function() {
    console.log(EventData.Mouse)
}, 1000);
