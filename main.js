

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
    context.lineTo(500, 0);
    context.lineTo(1000,100);
    context.fill();
}