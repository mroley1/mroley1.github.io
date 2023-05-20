

let socialButtons = document.querySelector(".navbar_left_info").children // get list of social buttons integrated
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

let dividers = document.querySelectorAll(".divider")
for (i = 0; i < dividers.length; i++) {
    let divider = dividers[i];
    var context = divider.getContext("2d");
    var width = divider.clientWidth;
    const dividerIndex = parseInt(divider.getAttribute("data-divider-after"))
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--main-colors-"+dividerIndex);
    context.fillRect(0, 0, 1000, 100);
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--main-colors-"+(dividerIndex+1));
    context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300, 0);
    context.lineTo(500, 50);
    context.lineTo(700, 0);
    context.lineTo(1000,100);
    context.fill();
}

const timelineDotTypes = {"timeline_begining": timelineBeginingGen, "timeline_entry": timelineEntryGen, "timeline_note": timelineNoteGen, "timeline_end": timelineEndGen}
let timelines = document.querySelectorAll(".timeline_container");
for (var i = 0; i < timelines.length; i++) {
    let timeline = timelines[i];
    let elements = timeline.children;
    var table = document.createElement("table");
    table.style = "border-collapse: collapse; border-spacing: 0px";
    for (var j = 0, length = elements.length; j < length; j++) {
        let element = elements[0];
        table.append(timelineDotTypes[element.className](element.cloneNode(true)))
        element.remove();
    }
    timeline.appendChild(table)
}

function timelineBeginingGen(_) {
    var final = document.getElementById("timelineBeginingTemplate").content.cloneNode(true);
    return final;
}
function timelineEntryGen(content) {
    var final = document.getElementById("timelineEntryTemplate").content.cloneNode(true);
    final.getElementById("timelineEntryTemplate_date").innerHTML = content.getAttribute("data-date");
    final.getElementById("timelineEntryTemplate_title").innerHTML = content.getAttribute("data-title");
    final.getElementById("timelineEntryTemplate_content").innerHTML = content.innerHTML;
    return final;
}
function timelineNoteGen(content) {
    var final = document.getElementById("timelineNoteTemplate").content.cloneNode(true);
    final.getElementById("timelineNoteTemplate_date").innerHTML = content.getAttribute("data-date");
    final.getElementById("timelineNoteTemplate_content").innerHTML = content.innerHTML;
    return final;
}
function timelineEndGen(_) {
    var final = document.getElementById("timelineEndTemplate").content.cloneNode(true);
    return final;
}