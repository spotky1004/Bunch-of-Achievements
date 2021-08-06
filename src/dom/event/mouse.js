import * as EventUtil from "../../util/eventUtil.js";

/**
 * @typedef EventDataType
 * @type {object}
 * 
 * @property {number} counter
 * 
 * @property {Object} target
 * @property {?HTMLElement} target.click
 * @property {?HTMLElement} target.hover
 * 
 * @property {boolean} isMouseDown
 * @property {moveLength} dragLength
 * 
 * @property {?MouseEvent} raw
 */

/**
 * @type {EventDataType}
 */
let EventData = {
    // Misc
    counter: 0,

    // Important
    target: {
        click: null,
        hover: null
    },

    // Computed
    isMouseDown: false,
    dragLength: [0, 0],

    // Raw
    raw: null,
};

document.addEventListener("mousedown", function(e) {
    EventData.raw = e;

    EventData.counter++;

    EventData.isMouseDown = true;
    EventData.target.click = e.target;
    EventData.dragLength = [0, 0];
});
document.addEventListener("mouseup", function(e) {
    EventData.isMouseDown = false;
});

document.addEventListener("mousemove", function(e) {
    EventData.target.hover = e.target;

    if (EventData.isMouseDown) {
        const movement = EventUtil.pxToRatio(e.movementX, e.movementY);
        EventData.dragLength[0] += movement.x;
        EventData.dragLength[1] += movement.y;
    }
});

export default EventData;