

let socialButtons = document.querySelector(".navbar_left_info").children // get list of social button integrated
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