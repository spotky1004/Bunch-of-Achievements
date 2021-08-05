import Achievements from "../data/achievements.js";

const parant = document.getElementById("achievementWarp");

const Cache = {};
for (const key in Achievements) {
    const achievement = Achievements[key];



    const item = document.createElement("div");
    item.classList.add("achievementItem");
    item.dataset.key = key;

    const title = document.createElement("div");
    title.classList.add("title");
    title.dataset.text = achievement.title;
    item.append(title);

    const description = document.createElement("div");
    description.classList.add("description");
    description.dataset.text = achievement.description;
    item.append(description);



    Cache[key] = { item, title, description };
    parant.appendChild(item);
}

export default Cache;