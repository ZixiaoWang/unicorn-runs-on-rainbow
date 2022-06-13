window.checkTimeTimeout = 0;

// const BG_CLOUDS = [1,2,3,4].map(index => `assets/bg-cloud-${index}.png`);
// const FG_CLOUDS = [1,2,3,4,5].map(index => `assets/cloud-${index}.png`);
const BG_CLOUDS = [1,2,3,4,5,6,7,8,9].map(index => `assets/realcloud${index}.png`);
const FG_CLOUDS = [1,2,3,4,5,6,7,8,9].map(index => `assets/realcloud${index}.png`);
const FLOAT_CLOUDS = [1,2,3,4,5,6,7,8,9,10].map(index => `assets/float-cloud-${index}.png`);
const RAINBOW = "assets/rainbow.png";
// const UNICORN = "assets/unicorn.gif";
const UNICORN = "assets/unicorn_with_wings.gif";
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

    if (/rainbow\.png$|unicorn\.gif|unicorn_with_wings\.gif$/.test(img.src)) {
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
    const projects = [`Violette's Bedtime Stories`,
    `Sophia's cold brew coffee`,
    `Ryan's free ride service`,
    `Public Speaking with Ken`,
    `Sophia's Squash Sparring Service`,
    `Hiking with Ken`,
    `Dog parenting 101`,
    `Cara's Super Natural Experience Sharing`,
    `Olivier's Skateboard 101`,
    `Exam Prep/Tips for CSCP (Certified Supply Chain Professionals)`,
    `Chef Mengmeng`,
    `Teach fencing, tennis and badminton in Switch`,
    `Min's “lying" house`,
    `15000+ steps seashore walking with Sophia in Nanshan district`,
    `Scooter ride to Shekou `,
    `Jane's Procreate tutorial for beginner`,
    `Basketball training workout with Jeremy`,
    `Running with Luxun`,
    `Cecilia's Amazon Jungle Volunteer and Survival Experience in Peru`,
    `Shanghai Coffee Shop Recommendation`,
    `John's Ultimate Frisbee workout `,
    `Dog walk service`,
    `Helen’s crochet moments `,
    `Chris' Tea House`,
    `Delightful Photo Shoot with Richard`,
    `How to create an app in Slack`,
    `Stephen's Cantonese Class`,
    `Holly's workout buddy `,
    `Penny's Running and gym buddy`,
    `Caleb's play reading  `,
    `The secret of keeping young`,
    `Sichuan Mahjong Class`,
    `Thinking about learning Spanish?`,
    `Learn Enough Python to pass a Tech Interview`,
    `Todd & Gabriel's Musical Extravaganza`,
    `Mayne's NS Game Collaboration Workshop`,
    `Secret of pricing `,
    `Where to Eat`,
    `Chinese calligraphy for beginners (楷书）`,
    `Follow Val on a wine tour around OCT`,
    `Movie Marathon aaaannnd You Get to Pick`,
    `Take Linkedin learning together`,
    `Colin's Danke Schoen German Classes`,
    `The art of Gifing`,
    `Cycling with Sean`,
    `Jilong's Rubber Band Magic Teaching`,
    `Jilong's How to Setup Your Shadowsocks to 翻墙`,
    `April's Video Clips - Primary`,
    `Victor's Excel Analysis `,
    `Jiali's Restaurants Recommendations`,
    `Yvonne‘s MBTI Class`,
    `Louis' Japanese Chat Room`,
    `Louis' dog walking experience`,
    `Josh's CRT shower room (Male) sharing`,
    `Meditate with Yumeng`,
    `Check in Shenzhen restaurant influencers`,
    `Linjia's Tennis session /1v1/2v2`,
    `Restorative Break With Adeline`,
    `Buy and HODL crypto until rich`,
    `Cycling with Vikki around Shenzhen`,
    `Jayden's Excel Class - The Simple and Most Useful Formulas`,
    `Jayden's Exclusive Poker Magic Card Tricks!`,
    `Yulin's Cafe recommendations in SZ(Tandian)`,
    `Teck Wei's Basic Investment Introduction`,
    `Lotte's Tennis Sessions`,
    `Lotte's Squash Sessions`,
    `Link's Ukulele Class`,
    `Korean Learning`,
    `Jane's Fitness Time`,
    `Yulin's pet care service`,
    `Joey's Cat Adoption Service`,
    `Pop-song Music Jam`,
    `Ulani's Sewing Class 101`,
    `"好好陪伴"`,
    `Yoga Time!`,
    `Peipei's planting tutorials`,
    `Coffee chat or if you would like to learn Korean/Cantonese`,
    `Cabin Crew Life Sharing`,
    `Meet Guitar`,
    `Grow avocado from seed`,
    `Time to get up!`,
    `Finding Directions with Henry Ko `,
    `Have fun to speak  Cantonese`,
    `Peace under Your Pen - Zentangle Time! (禪繞畫)`,
    `Intro to ballroom dancing with Le Bang`,
    `Learn basic Dutch with Le Bang`,
    `Hotkeys / Shortcuts / Productivity Tools`,
    `Proofreading`,
    `Andy's Energy Attunement`,
    `Karen's Lean Six Sigma Green Belt Certification Experience`,
    `Zhuhai and Macao travel tips sharing`,
    `F45 workout buddy`,
    `House plant shopping with Fiona`,
    `Switch Gaming at (after) Work!!!!`,
    `Yu ning's Aquarium Workshop`,
    `Nadia's puppy play date!`,
    `Spearfishing 101`,
    `Lotte's Dog Babysitting Service `,
    `Intro to Mahjong `,
    `Cecilia's Bakery Sharing and Tasting`,
    `Your Amazing By Henry Ko `,
    `Joe's Scuba Diving - Introductory Diving`,
    `Godwin's 紫微斗數 (小批）`,
    `Eric's physical therapy `,
    `Let's play board games!`,
    `Presentation Coaching`,
    `SunRide by the Ocean / Nanshan`,
    `Susan's Exciting Timi Playrooom `,
    `Catering Service - German Food`,
    `Afternoon at the (Art) Museum`,
    `Introduction to DJing`,
    `CSGO smoke/molotov/flashbang Sharing`,
    `Karen's 200hrs Yoga Teacher Training experience sharing`,
    `Practice Structured Thinking Skill`,
    `Texas Hold'em for beginners 德州扑克`,
    `From one line to more `,
    `Vivian's Jewellery Identification & Appraisal Class`,
    `Wanna Play around with SQL?`,
    `Understand Shenzhen Warehouse in Depth`,
    `Make the best presentation deck/slides with Holly`,
    `Lorry's Jogging group`,
    `Lorry's Climbing Group`,
    `SQL introduction`,
    `Self-Love 1001..02..03..04..n`,
    `Wittmann's Free Lunch`,
    `Cassie's Climbing(攀岩) Class 🧗‍♀️`,
    `Tracy's Fruit Milkshake Shop`,
    `Sailing Class (J80 class tournament) `,
    `Flex and Relax with Cathy`];
    
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