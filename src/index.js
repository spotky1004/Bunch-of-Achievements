import Decimal from "../lib/decimal.mjs";

import { DomCache, EventData, DomUpdate, EventWork } from "./dom/init.js";
import Update from "./update/_index.js"
import SaveData from "./types/saveData.js";
import * as SaveLoad from "./util/SaveLoad.js";



/** @type {SaveData} */
let saveData = SaveLoad.Load();
window.saveData = saveData;

let lastTime = new Date().getTime();
let lastSave = new Date().getTime();
/**
 * @param {number} dt 
 */
function gameTick() {
    // Time
    const now = new Date().getTime();
    const dt = now - lastTime;
    lastTime = now;
    if (now - lastSave > 5000) {
        SaveLoad.Save(saveData);
        lastSave = now;
    } 

    // Update Game
    for (const section in Update) {
        const _Section = Update[section];
        for (const key in _Section) {
            _Section[key](saveData, dt);
        }
    }

    // EventWork
    for (const name in EventWork) EventWork[name]();

    // Update DOM
    for (const section in DomUpdate) {
        const _Section = DomUpdate[section];
        for (const key in _Section) {
            _Section[key](saveData);
        }
    }

    requestAnimationFrame(gameTick);
}
requestAnimationFrame(gameTick); // init
