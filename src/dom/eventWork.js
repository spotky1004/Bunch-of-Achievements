import * as EventUtil from "../util/eventUtil.js";
import { EventData } from "./init.js"

const Cache = {
    AchievementParallax: null
};

export function Blur() {
    if (EventData.Blur.isBlur) {
        EventData.Blur.focusTimestemp = new Date().getTime();
        
        EventData.Mouse.isMouseDown = false;
    }
}

export function AchievementParallax() {
    const Mouse = EventData.Mouse;
    
    const ele = EventUtil.checkElementQuery(Mouse.target.hold, "achievementItem");
    if (ele && Mouse.isMouseDown) {
        Cache.AchievementParallax = ele;
        EventUtil.Effect.Parallax({
            ele,
            x: Mouse.dragLength.x,
            y: Mouse.dragLength.y,
            div: 1.8
        });
    } else if (Cache.AchievementParallax) {
        Cache.AchievementParallax.style = "";
        Cache.AchievementParallax = null;
    }
}
