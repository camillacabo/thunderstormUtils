const thunderstormActive = new Image("thunderstormActive.png", "https://inspektur.net/assets/thunderstormActive.png");
const thunderstormInactive = new Image("thunderstormInactive.png", "https://inspektur.net/assets/thunderstormInactive.png");

function secsToTime(num) { return new Date(seconds * 1000).toISOString().slice(11, 19); }

const cooldown = 2400;
const duration = 1200;
const thunderstormInterval = 3;

register("renderOverlay", () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const skyblockAge = (timestamp - 1560275700);
    const thunderstorm = skyblockAge % ((cooldown + duration) * thunderstormInterval);
    const rain = skyblockAge % (cooldown + duration);

    // thunderstorm taking place
    if ((cooldown <= thunderstorm) && (thunderstorm < (cooldown + duration))) { 
        let timeLeft = (cooldown + duration) - rain;
        Renderer.drawString(secsToTime(timeLeft), 30, 33.5);
        thunderstormInactive.draw(5, 25, 25, 25);
    }
    // thunderstorm not occuring
    else { 
        let nextThunderstorm;
        if (thunderstorm < cooldown) {nextThunderstorm = cooldown - thunderstorm; } 
        else if ((cooldown + duration) <= thunderstorm) { nextThunderstorm = ((cooldown + duration) * thunderstormInterval) - thunderstorm + cooldown; }
        Renderer.drawString(secsToTime(nextThunderstorm), 30, 33.5);
        thunderstormActive.draw(5, 25, 25, 25);
    }
});