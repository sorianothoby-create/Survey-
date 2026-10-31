
// YES / NO PRANK WEBSITE

const questions = {
  Q1: {
    text: "Are you gay?",
    yes: "Q2",
    no: "Q3"
  },
  Q2: {
    text: "Do you want to go to heaven?",
    yes: "END1",
    no: "Q4"
  },
  Q3: {
    text: "Are you a good person?",
    yes: "Q2",
    no: "Q5"
  },
  Q4: {
    text: "Are you scared of dogs?",
    yes: "END2",
    no: "Q7"
  },
  Q5: {
    text: "Do you regret your bad decisions?",
    yes: "Q6",
    no: "Q8"
  },
  Q6: {
    text: "Do you consider yourself lucky?",
    yes: "Q4",
    no: "Q9"
  },
  Q7: {
    text: "Do you think you're attractive?",
    yes: "Q10",
    no: "Q9"
  },
  Q10: {
    text: "Do you like Esmiringhoy?",
    yes: "END3",
    no: "Q11"
  },
  Q8: {
    text: "Do you think you make good choices?",
    yes: "Q6",
    no: "Q12"
  },
  Q9: {
    text: "Do you like pancakes?",
    yes: "Q13",
    no: "Q12"
  },
  Q13: {
    text: "Do you like cooking?",
    yes: "END4",
    no: "Q14"
  },
  Q11: {
    text: "Do you like ghosts? 👻",
    yes: "END5",
    no: "Q14"
  },
  Q14: {
    text: "Do you like playing guitar?",
    yes: "Q15",
    no: "Q12"
  },
  Q15: {
    text: "Can you finger A minor?",
    yes: "END6",
    no: "Q12"
  },
  Q12: {
    text: "Do you want Chicken Joy?! 🍗",
    yes: "END7",
    no: "END7"
  }
};

const endings = {
  END1: {
    title: "HEAVEN'S VIP LIST 😇",
    message: "Your answers have been reviewed. Please proceed to the imaginary golden gates.",
    image: "images/ending-1.jpg",
    sound: "sounds/ending-1.mp3"
  },
  END2: {
    title: "DOGS HAVE YOU SHOOK 🐶",
    message: "Even a tiny puppy has you reconsidering your life choices.",
    image: "images/ending-2.jpg",
    sound: "sounds/ending-2.mp3"
  },
  END3: {
    title: "ESMIRING-ESMIRINGHOOOY!",
    message: "You saw the warning signs and still chose chaos. Respectfully... WHY?",
    image: "images/ending-3.jpg",
    sound: "sounds/ending-3.mp3"
  },
  END4: {
    title: "MASTER CHEF?! 🍳",
    message: "The kitchen welcomes you. The smoke alarm is cautiously optimistic.",
    image: "images/ending-4.jpg",
    sound: "sounds/ending-4.mp3"
  },
  END5: {
    title: "GHOST HUNTER 👻",
    message: "You are either fearless or you haven't watched a scary movie at night.",
    image: "images/ending-5.jpg",
    sound: "sounds/ending-5.mp3"
  },
  END6: {
    title: "AYOOO WUTTT?!! 🚨",
    message: "A minor? Okay, musician. Play us something!",
    image: "images/ending-6.jpg",
    sound: "sounds/ending-6.mp3"
  },
  END7: {
    title: "CHICKEN JOY!!!🍗",
    message: "Yes or no, the result is the same. You have been summoned to the chicken kingdom.",
    image: "images/ending-7.jpg",
    sound: "sounds/ending-7.mp3"
  }
};

// HTML ELEMENTS
const questionPanel = document.getElementById("questionPanel");
const loadingPanel = document.getElementById("loadingPanel");
const endingPanel = document.getElementById("endingPanel");
const questionText = document.getElementById("questionText");
const stepLabel = document.getElementById("stepLabel");

const endingPhoto = document.getElementById("endingPhoto");
const photoFallback = document.getElementById("photoFallback");

const scareOverlay = document.getElementById("scareOverlay");
const scareImage = document.getElementById("scareImage");

const endingTitle = document.getElementById("endingTitle");
const endingMessage = document.getElementById("endingMessage");

let currentQuestion = "Q1";
let questionNumber = 1;
let locked = false;

// PLAY A UNIQUE SOUND FOR EACH ENDING
function playEndingSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.volume = 1;

  audio.play().catch(() => {
    // The visual surprise still works if audio is unavailable.
  });
}

// SHOW QUESTION
function showQuestion(id) {
  if (!questions[id]) return;

  currentQuestion = id;

  questionText.textContent = questions[id].text;
  stepLabel.textContent = `QUESTION ${questionNumber}`;

  questionPanel.classList.remove("hidden");
  loadingPanel.classList.add("hidden");
  endingPanel.classList.add("hidden");
  scareOverlay.classList.remove("show");

  locked = false;
}

// HANDLE ANSWER
function answer(choice) {
  if (locked) return;

  const question = questions[currentQuestion];
  if (!question || !question[choice]) return;

  locked = true;

  const next = question[choice];

  questionPanel.classList.add("hidden");

  // ENDINGS SKIP THE LOADING SCREEN
  if (next.startsWith("END")) {
    showEnding(next);
    return;
  }

  // NORMAL QUESTIONS SHOW THE LOADING SCREEN
  loadingPanel.classList.remove("hidden");

  window.setTimeout(() => {
    questionNumber++;
    showQuestion(next);
  }, 450);
}

// SHOW ENDING WITH PHOTO SURPRISE
function showEnding(id) {
  const result = endings[id];
  if (!result) return;

  loadingPanel.classList.add("hidden");
  questionPanel.classList.add("hidden");
  endingPanel.classList.add("hidden");

  stepLabel.textContent = "FINAL RESULT";

  // NORMAL ENDING PHOTO
  endingPhoto.style.display = "none";
  photoFallback.style.display = "grid";

  endingPhoto.onload = () => {
    endingPhoto.style.display = "block";
    photoFallback.style.display = "none";
  };

  endingPhoto.onerror = () => {
    endingPhoto.style.display = "none";
    photoFallback.style.display = "grid";
  };

  endingPhoto.src = result.image;

  // FULL-SCREEN SURPRISE PHOTO
  scareImage.onload = () => {
    scareOverlay.classList.remove("show");

    // Restart the animation
    void scareOverlay.offsetWidth;

    // Show the surprise photo
    scareOverlay.classList.add("show");

    // Play sound after the photo starts appearing
    requestAnimationFrame(() => {
      playEndingSound(result.sound);
    });

    // Show the normal ending after 1 second
    window.setTimeout(() => {
      scareOverlay.classList.remove("show");

      endingTitle.textContent = result.title;
      endingMessage.textContent = result.message;

      endingPanel.classList.remove("hidden");
    }, 1000);
  };

  scareImage.onerror = () => {
    scareOverlay.classList.remove("show");

    endingTitle.textContent = result.title;
    endingMessage.textContent = result.message;

    endingPanel.classList.remove("hidden");
  };

  scareImage.src = result.image;
}

// YES BUTTON
document.getElementById("yesButton").addEventListener("click", () => {
  answer("yes");
});

// NO BUTTON
document.getElementById("noButton").addEventListener("click", () => {
  answer("no");
});

// RESTART BUTTON
document.getElementById("restartButton").addEventListener("click", () => {
  questionNumber = 1;
  locked = false;

  scareOverlay.classList.remove("show");

  showQuestion("Q1");
});

// START WITH THE FIRST QUESTION
showQuestion("Q1");
