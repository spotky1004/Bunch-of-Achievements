import * as EventUtil from "../../util/eventUtil.js";

/**
 * @typedef EventDataType
 * @type {object}
 * 
 * @property {number} counter
 * 
 * @property {Object} target
 * @property {?HTMLElement} target.hold
 * @property {?HTMLElement} target.hover
 * 
 * @property {boolean} isMouseDown
 * @property { {x: number, y: number} } dragLength
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
        hold: null,
        hover: null
    },

    // Computed
    isMouseDown: false,
    dragLength: {x: 0, y: 0},

    // Raw
    raw: null,
};

document.addEventListener("mousedown", function(e) {
    EventData.raw = e;

    EventData.counter++;

    EventData.isMouseDown = true;
    EventData.target.hold = e.target;
    EventData.dragLength = {x: 0, y: 0};
});
document.addEventListener("mouseup", function(e) {
    EventData.target.hold = null;
    EventData.isMouseDown = false;
    EventData.dragLength = {x: 0, y: 0};
});

document.addEventListener("mousemove", function(e) {
    EventData.target.hover = e.target;

    if (EventData.isMouseDown) {
        const movement = EventUtil.pxToRatio(e.movementX, e.movementY);
        EventData.dragLength.x += movement.x;
        EventData.dragLength.y += movement.y;
    }
});

export default EventData;