
// ! dividers
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
    context.bezierCurveTo(300, 0, 700, 0, 1000, 100);
    context.fill();
    // set foreground to next color
}

// ! timeline
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

// ! knowledge bar
let knowledgeBars = document.querySelectorAll(".knowledgeBar");
for (let i = 0; i < knowledgeBars.length; i++) {
    let knowledgeBar = knowledgeBars[i];
    let knowledgeAmmount = parseInt(knowledgeBar.getAttribute("data-knowledge"));
    let knowledgeMax = parseInt(knowledgeBar.getAttribute("data-knowledgeMax"));
    for (let j = 0; j < knowledgeMax; j++) {
        let peice = document.createElement("div");
        peice.classList = "knowledgeBar_dot_side";
        if (knowledgeAmmount > j) {
            peice.style.backgroundColor = knowledgeBar.getAttribute("data-fillColor");
        } else {
            peice.style.backgroundColor = knowledgeBar.getAttribute("data-blankColor");
        }
        knowledgeBar.appendChild(peice);
    }
    
}