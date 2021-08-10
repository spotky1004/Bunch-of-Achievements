import * as EventUtil from "../../util/eventUtil.js";

/**
 * @typedef EventDataType
 * @type {object}
 * 
 * @property {number} focusTimestemp
 * 
 * @property {boolean} isBlur
 * 
 * @property {?FocusEvent} raw
 */

/**
 * @type {EventDataType}
 */
let EventData = {
    // computed
    focusTimestemp: new Date().getTime(),

    // Important
    isBlur: false,

    // Raw
    raw: null,
};



window.addEventListener("blur", function(e) {
    EventData.isBlur = true;
    EventData.raw = e;
});

window.addEventListener("focus", function(e) {
    EventData.isBlur = false;
    EventData.raw = e;
});

export default EventData;
