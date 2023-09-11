const thunderstormActive = new Image("thunderstormActive.png", "https://inspektur.net/assets/thunderstormActive.png");
const thunderstormInactive = new Image("thunderstormInactive.png", "https://inspektur.net/assets/thunderstormInactive.png");

function secsToTime(num) {
    var hours = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

const UTCPrevThunderstorm = 1668474356000;

register("renderOverlay", () => {
    const UTCNow = new Date().getTime();
    const base = Math.floor((UTCNow - UTCPrevThunderstorm) / 1000);
    const thunderstorm = base % ((3850 + 1000) * 4);

    // thunderstorm not occuring
    if (thunderstorm < (3850 * 4 + 1000 * 3)) { 
        Renderer.drawString(secsToTime(3850 * 4 + 1000 * 3 - thunderstorm), 30, 33.5);
        thunderstormActive.draw(5, 25, 25, 25);
    }
    // thunderstorm taking place
    else { 
        Renderer.drawString(secsToTime(3850 * 4 + 1000 * 4 - thunderstorm), 30, 33.5);
        thunderstormInactive.draw(5, 25, 25, 25);
    }
});