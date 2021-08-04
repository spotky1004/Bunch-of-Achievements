import { Achievement } from "../class/Achievement.js";

/**
 * @typedef { { title: string, description: string } } AchievementConstructor
 * @type { Object.<string, AchievementConstructor[]> }
 */
const AchievementData = {
    TimePlay: [
        {
            title: "Play 10 Seconds",
            description: "Welcome to the game which is an Achievement achievement game that has a lot of achievements to achieve! Your goal is to achieve as many as achievements. This statement is very long... blah blah blah... At this point, text may be cut down to half. At this point, most monitors can't see this text. At this point, no one can see this... What? How. You hacker. Anyway, import \"Cheat3r\" to earn the secret achievement."
        },
        {
            title: "Play 100 Seconds",
            description: "You should be somewhat familiar with this game by now."
        },
        {
            title: "Play 600 Seconds",
            description: "10 Minuts with this game."
        },
        {
            title: "Play 1000 Seconds",
            description: "1k Seconds!"
        },
        {
            title: "Play 3600 Seconds",
            description: "You can't stop Achieve."
        },
        {
            title: "Play 10000 Seconds",
            description: "Zzz..."
        }
    ],
    TimeStart: [
        {
            title: "Started 36000 Seconds ago",
            description: "Sort of offline progress."
        },
        {
            title: "Started 86400 Seconds ago",
            description: "Thanks for playing my game :D"
        }
    ],
    TimeFocus: [
        {
            title: "Focus 1000 Seconds",
            description: "Focus to this game, watch the entire color loop..."
        },
        {
            title: "Focus 3600 Seconds",
            description: "Getting Focus Achievement is pain!"
        }
    ],
    Point: [

    ],
    News: [
        {
            title: "Click an Alphabet on News Ticker",
            description: "Color the Newspaper!"
        },
        {
            title: "Master one News message",
            description: "Master? What is it?"
        },
        {
            title: "Master 10 News message",
            description: "Newspaper is coloring book!"
        },
        {
            title: "Master 25 News message",
            description: "How many alphabets you clicked?"
        },
        {
            title: "Master 50 News message",
            description: "You started to remember News."
        },
        {
            title: "Master all News",
            description: "Nice Collection."
        }
    ],
    Easter: [

    ]
};

/**
 * @type {Object.<string, Achievement>}
 */
const Achievements = {};
for (const section in AchievementData) {
    const sectionAchievements = AchievementData[section];
    for (let i = 0; i < sectionAchievements.length; i++) {
        Achievements[section + (i+1)] = new Achievement(sectionAchievements[i]);
    }
}

export default Achievements;