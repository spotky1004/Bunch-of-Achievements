import * as EventUtil from "../util/eventUtil.js";
import { EventData } from "./init.js"

const Cache = {
    AchievementParallax: null
};

export default {
    AchievementParallax: function() {
        const Mouse = EventData.Mouse;
        
        const ele = EventUtil.checkElementQuery(Mouse.target.hold, "achievementItem");
        if (ele) {
            Cache.AchievementParallax = ele;
            EventUtil.Effect.Parallax({
                ele,
                x: Mouse.dragLength.x,
                y: Mouse.dragLength.y,
                div: 2
            });
        } else if (Cache.AchievementParallax) {
            Cache.AchievementParallax.style = "";
            Cache.AchievementParallax = null;
        }
    }
};