import Decimal from "../../lib/decimal.mjs";

import defaultSaveData from "../data/defaultSave.js";
import SaveData from "../types/saveData.js";

/**
 * @param {SaveData} saveData 
 * @param {string} key 
 */
export function Save(saveData, key="BunchOfAchievements_TestSave") {
    localStorage.setItem(key, JSON.stringify(saveData));
}
/**
 * @param {string} key 
 * @returns {SaveData}
 */
export function Load(key="BunchOfAchievements_TestSave") {
    return mergeObject(
        JSON.parse(localStorage.getItem(key) ?? "{}"),
        defaultSaveData
    );
}



function mergeObject(target, source) {
    target = target ?? {};
    for (const i in source) {
        if (source[i] instanceof Decimal) {
            target[i] = new Decimal(target[i] ?? source[i]);
        } else if (Array.isArray(source[i])) {
            target[i] = target[i] ?? [];
            mergeArray(target[i], source[i])
        } else if (typeof source[i] === "object") {
            target[i] = mergeObject(target[i], source[i]);
        } else {
            target[i] = source[i].constructor(target[i] ?? source[i]);
        }
    }
    return target;
}
function mergeArray(target, source) {
    for (let i = 0, l = source.length; i < l; i++) {
        if (source[i] instanceof Decimal) {
            target[i] = new Decimal(target[i] ?? source[i]);
        } else if (Array.isArray(source[i])) {
            mergeArray(target[i], source[i]);
        } else if (typeof source[i] === "object") {
            target[i] = mergeObject(target[i], source[i]);
        } else {
            target[i] = source[i].constructor(target[i] ?? source[i]);
        }
    }
    return target;
}