

let socialButtons = document.querySelectorAll(".navbar_social_button_a") // get list of social buttons integrated
for (i = 0; i < socialButtons.length; i++) {
    // loop through each button
    let button = socialButtons[i].querySelector(".navbar_social_button");
    // If mouse enters button switch SVG to selected one
    button.addEventListener("mouseenter", (e) => {
        e.target.firstElementChild.src = e.target.firstElementChild.src.replace(/default/, "selected");
    });
    // If mouse leaves button switch SVG to default one
    button.addEventListener("mouseout", (e) => {
        e.target.src = e.target.src.replace(/selected/, "default");
    });
}

// find all dividers
let dividers = document.querySelectorAll(".divider")
for (i = 0; i < dividers.length; i++) {
    // loop through each
    let divider = dividers[i];
    var context = divider.getContext("2d");
    var width = divider.clientWidth;
    const dividerIndex = parseInt(divider.getAttribute("data-divider-after"))
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--main-colors-"+dividerIndex);
    context.fillRect(0, 0, 1000, 100);
    // set background to top color
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--main-colors-"+(dividerIndex+1));
    context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300, 0);
    context.lineTo(500, 50);
    context.lineTo(700, 0);
    context.lineTo(1000,100);
    context.fill();
    // set foreground to next color
}

// generator for timeline uids
function * uid() {
    index = 0;
    while (true) {
        yield index++;
    }
}
const uidGenrator = uid();

// find all timelines
const timelineDotTypes = {"timeline_begining": timelineBeginingGen, "timeline_entry": timelineEntryGen, "timeline_note": timelineNoteGen, "timeline_end": timelineEndGen}
let timelines = document.querySelectorAll(".timeline_container");
for (var i = 0; i < timelines.length; i++) {
    let timeline = timelines[i];
    let elements = timeline.children;
    // set up table to insert
    var table = document.createElement("table");
    table.style = "border-collapse: collapse; border-spacing: 0px";
    for (var j = 0, length = elements.length; j < length; j++) {
        let element = elements[0];
        // add each element to table
        table.append(timelineDotTypes[element.className](element.cloneNode(true)))
        element.remove();
    }
    // append to main
    timeline.appendChild(table)
}
for (var i = 0; i < timelines.length; i++) {
    
}

// functions catalogued in timelineDotTypes, return tr(s) with correct formatting
function timelineBeginingGen(_) {
    var final = document.getElementById("timelineBeginingTemplate").content.cloneNode(true);
    return final;
}
function timelineEntryGen(content) {
    var final = document.getElementById("timelineEntryTemplate").content.cloneNode(true);
    let uid = uidGenrator.next().value;
    let date = final.getElementById("timelineEntryTemplate_date");
        date.innerHTML = content.getAttribute("data-date");
        date.id = "timelineDate_" + uid;
    let title = final.getElementById("timelineEntryTemplate_title");
        title.innerHTML = content.getAttribute("data-title");
        title.id = "timelineTitle_" + uid;
    let bodyContent = final.getElementById("timelineEntryTemplate_content");
        bodyContent.innerHTML = content.innerHTML;
        bodyContent.id = "timelineEntryContent_" + uid;
    let barExtension = final.getElementById("timelineEntryTemplate_barExtension");
        if (navigator.userAgent.search("Firefox") > -1) {
            // trust me this is the best solution I found for this bug
            barExtension.style.height = "100%"
        }
        barExtension.id = "timelineBarExtension_" + uid;
    return final;
}
function timelineNoteGen(content) {
    var final = document.getElementById("timelineNoteTemplate").content.cloneNode(true);
    let uid = uidGenrator.next().value;
    let date = final.getElementById("timelineNoteTemplate_date");
        date.innerHTML = content.getAttribute("data-date");
        date.id = "timelineNote_" + uid;
    let bodyContent = final.getElementById("timelineNoteTemplate_content")
        bodyContent.innerHTML = content.innerHTML;
        bodyContent.id = "timelineNoteContent_" + uid;
    return final;
}
function timelineEndGen(_) {
    var final = document.getElementById("timelineEndTemplate").content.cloneNode(true);
    return final;
}

let wordClots = document.querySelectorAll(".word_clot");
const positions = {0:"top", 1:"center", 2:"bottom"}
for (i = 0; i < wordClots.length; i++) {
    let wordClot = wordClots[i];
    let words = wordClot.querySelectorAll(".word_clot_word");
    for (j = 0; j < words.length; j++) {
        let word = words[j];
        word.style
    }
    l = Math.floor(Math.random() * 3)
}