window.checkTimeTimeout = 0;

// const BG_CLOUDS = [1,2,3,4].map(index => `assets/bg-cloud-${index}.png`);
// const FG_CLOUDS = [1,2,3,4,5].map(index => `assets/cloud-${index}.png`);
const BG_CLOUDS = [1,2,3,4,5,6,7,8,9].map(index => `assets/realcloud${index}.png`);
const FG_CLOUDS = [1,2,3,4,5,6,7,8,9].map(index => `assets/realcloud${index}.png`);
const FLOAT_CLOUDS = [1,2,3,4,5,6,7,8,9,10].map(index => `assets/float-cloud-${index}.png`);
const RAINBOW = "assets/rainbow.png";
const UNICORN = "assets/unicorn.gif";
const COINS = "assets/coins.gif";
const BACKGROUNDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(num => `assets/background-0${num}.jpg`);

const BACKGROUND_CONTAINER = document.querySelector(".background");
const BG_CLOUD_CONTAINER = document.querySelector(".bg-cloud");
const CLOUD_CONTAINER_1 = document.querySelector(".cloud-1");
const CLOUD_CONTAINER_2 = document.querySelector(".cloud-2");
const FG_CLOUD_CONTAINER = document.querySelector(".fg-cloud");
const FLOAT_CLOUD_CONTAINER_1 = document.querySelector(".float-cloud-1");
const FLOAT_CLOUD_CONTAINER_2 = document.querySelector(".float-cloud-2");
const FLOAT_CLOUD_CONTAINER_3 = document.querySelector(".float-cloud-3");
const COINS_CONTAINER_1 = document.querySelector(".coins-1");
const COINS_CONTAINER_2 = document.querySelector(".coins-2");
const COINS_CONTAINER_3 = document.querySelector(".coins-3");
const UNICORN_CONTAINER = document.querySelector(".unicorn");
const RAINBOW_CONTAINER = document.querySelector(".rainbow");
const BULLETS_CONTAINER = document.querySelector(".bullets");

const TEXT_COLORS = ["red", "orange", "yellow", "green", "cyan"];

const generateImg = (paths, duration) => {
    const img = document.createElement("img");
    const animationDuration = duration || 1000;
    
    if (typeof paths === "string") {
        img.src = paths;
    } else {
        const randomIndex = Math.floor(paths.length * Math.random());
        img.src = paths[randomIndex];
    }

    if (/rainbow\.png$|unicorn\.gif$/.test(img.src)) {
        img.classList.add("static");
    }
    img.style.animationDuration = (animationDuration / 1000).toFixed(1) + "s";
    return img;
}

const generateBullet = (text, index) => {
    const div = document.createElement("div");
    div.classList.add("bullet");
    div.textContent = text;
    div.style.color = TEXT_COLORS[index % TEXT_COLORS.length];
    return div;
}

const makeItAnimated = (container, paths) => {
    if (!container) {
        return null;
    }

    const duration = Math.round(Math.random() * 6000 + 6000);
    const img = generateImg(paths, duration);
    container.appendChild(img);
    setTimeout(() => container.removeChild(img), duration * 2);

    setTimeout(() => {
        makeItAnimated(container, paths);
    }, Math.round(duration / 2));
}

const coinAnimated = (container) => {
    const duration = Math.round(Math.random() * 5000 + 3000);
    const img = generateImg(COINS, duration);
    container.appendChild(img);
    setTimeout(() => container.removeChild(img), duration * 2);
    setTimeout(() => coinAnimated(container), Math.round(duration / 2));
}

RAINBOW_CONTAINER.append(generateImg(RAINBOW));
UNICORN_CONTAINER.append(generateImg(UNICORN));

makeItAnimated(BG_CLOUD_CONTAINER, BG_CLOUDS);
makeItAnimated(CLOUD_CONTAINER_1, FG_CLOUDS);
makeItAnimated(CLOUD_CONTAINER_2, FG_CLOUDS);
makeItAnimated(FG_CLOUD_CONTAINER, FG_CLOUDS);
// makeItAnimated(FLOAT_CLOUD_CONTAINER_1, FLOAT_CLOUDS);
// makeItAnimated(FLOAT_CLOUD_CONTAINER_2, FLOAT_CLOUDS);
// makeItAnimated(FLOAT_CLOUD_CONTAINER_3, FLOAT_CLOUDS);
coinAnimated(COINS_CONTAINER_1);
coinAnimated(COINS_CONTAINER_2);
coinAnimated(COINS_CONTAINER_3);

const checkTime = (...targetTime) => {
    window.clearTimeout(window.checkTimeTimeout)
    const now = targetTime ? new Date(...targetTime) : new Date();
    const hourIndex = now.getHours();
    console.log({ now, hourIndex })
    BACKGROUND_CONTAINER.style.backgroundImage = `url(${BACKGROUNDS[hourIndex]})`;
    window.checkTimeTimeout = setTimeout(checkTime, 1000 * 60 * 30);
}

const updateClock = (showSemicolon) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const timeFragments = now.toLocaleTimeString().split(/:|\s/).slice(0, 3);
    const time = showSemicolon ? timeFragments.join(":") : timeFragments.join(" ");
    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
    setTimeout(() => updateClock(!showSemicolon), 500);
}

const updateData = () => {
    const searchString = location.search.substring(1);
    const searchfragments = searchString.split("&");
    const query = {};

    searchfragments.forEach(fragment => {
        const keyvaluepair = fragment.split("=");
        const key = keyvaluepair[0]?.toLocaleLowerCase();
        const value = keyvaluepair[1]?.toLocaleLowerCase();
        query[key] = value;
    });

    document.getElementById("participants").textContent = query["participant"] || query["participants"] || 0;
    document.getElementById("projects").textContent = query["project"] || query["projects"] || 0;
    document.getElementById("donation").textContent = query["donation"] || query["donations"] || 0;
}

const renderButtlets = () => {
    const projects = [
        "(Project) Violette’s Bedtime Stories - (FlexAngel)  Violette Zhuang",
        "Sophia’s cold brew coffee - Sophia Xu",
        "Ryan’s free ride service - Ryan Zhang",
        "Public Speaking with Ken - Ken Fong",
        "Sophia’s Squash Sparring Service - Sophia Xu",
        "Hiking with Ken - Ken Fong",
        "Dog parenting 101 - Vikki Yao",
        "Cara’s Super Natural Experience Sharing - Cara Steenstra",
        "Olivier’s Skateboard 101 - Olivier ",
        "Exam Prep/Tips for CSCP (Certified Supply Chain Professionals) - Mengmeng Zeng",
    ];
    
    projects.forEach((project, index) => {
        const div = generateBullet(project, index);
        BULLETS_CONTAINER.appendChild(div);
    });

    let left = 0;
    const move = () => {
        BULLETS_CONTAINER.style.left = left + "px";
        left -= 4;
        if (left <= -1 * (BULLETS_CONTAINER.getBoundingClientRect().width - window.innerWidth)) {
            left = 0;
        }
        window.requestAnimationFrame(move);
    }

    move();
}

checkTime();
updateClock();
updateData();
renderButtlets();