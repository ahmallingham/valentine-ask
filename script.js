// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

// Move the NO button away based on cursor proximity (more dynamic)
buttons.addEventListener("mousemove", (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const distance = Math.hypot(dx, dy);

    const threshold = 220; // start pushing when cursor is within this many px
    const maxPush = 200; // maximum push distance

    if (distance < threshold) {
        const strength = (threshold - distance) / threshold; // 0..1
        const push = strength * maxPush;

        const nx = dx / (distance || 1);
        const ny = dy / (distance || 1);

        let moveX = -nx * push;
        let moveY = -ny * push;

        // Clamp movement so the NO button stays within the buttons container
        const containerRect = buttons.getBoundingClientRect();
        const limitX = Math.max(0, (containerRect.width / 2) - (btnRect.width / 2) - 10);
        const limitY = Math.max(0, (containerRect.height / 2) - (btnRect.height / 2) - 10);

        moveX = Math.max(-limitX, Math.min(limitX, moveX));
        moveY = Math.max(-limitY, Math.min(limitY, moveY));

        noBtn.style.transition = "transform 0.12s ease";
        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
        // return to original spot when cursor is far
        noBtn.style.transition = "transform 0.2s ease";
        noBtn.style.transform = "translate(0, 0)";
    }
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});