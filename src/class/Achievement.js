import SaveData from "../types/saveData.js";

export class Achievement {
    constructor({ title, description, progressCheck }) {
        this.title = title ?? "PlaceHolder";
        this.description = description ?? "Placeholder";
        this.progressCheck = progressCheck ?? (() => 0);
        this.progress = 0;
        this.completed = false;
    }
    /**
     * title of the achievement.
     */
    title = new String;
    /**
     * Description of the achievement.
     */
    description = new String;
    /**
     * Check progress of the achievement.
     * 
     * @param {Object} saveData - SaveData of player
     * @return {Number} - Progress of the achievement.
     */
    progressCheck = new Function;
    /**
     * Progress of the achievement.
     */
    progress = new Number;
    /**
     * A Boolean that check achievement is completed.
     */
    completed = new Boolean;

    /**
     * @param {SaveData} saveData 
     * @returns {number} - Progress of the Achievemenmt.
     */
    check(saveData) {
        this.progress = Math.min( 1, Math.max(this.progress, this.progressCheck(saveData)) );
        if (this.progress >= 1) this.completed = true;

        return this.progress;
    }
}