/**
 * Create
 */
import AchievementList from "./create/achievementList.js";

const Cache = {
    AchievementList
};
console.log(Cache);

/**
 * Event
 */
import Mouse from "./event/mouse.js";

const Event = {
    Mouse
};
console.log(Event);


import EventWork from "./eventWork.js";

export { Cache as DomCache, Event as EventData, EventWork};