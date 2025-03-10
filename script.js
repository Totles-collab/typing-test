let timer;
let timeLeft = 60;  // 1 minute countdown
let typingStarted = false;
let correctWords = 0;
let totalWords = 0;
let passage = `Cloud computing is the delivery of computing services like storage, processing power, and software applications over the internet (the "cloud"), rather than from a local server or personal computer. Instead of owning and maintaining physical hardware (like servers), businesses and individuals can use services provided by cloud providers to access the resources they need.`; // example passage

// Function to start the typing test
function startTest() {
    if (typingStarted) {
        resetTest();
        return;
    }

    typingStarted = true;
    document.getElementById("start-btn").innerText = "Restart Test";
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").value = "";
    document.getElementById("passage-text").innerText = passage;
    document.getElementById("timer").innerText = timeLeft;

    // Start the timer
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft === 0) {
            endTest();
        }
    }, 1000);
}

// Function to end the test
function endTest() {
    clearInterval(timer);
    typingStarted = false;
    document.getElementById("user-input").disabled = true;
    calculateWPM();
}

// Function to reset the test
function resetTest() {
    timeLeft = 60;
    correctWords = 0;
    totalWords = 0;
    document.getElementById("start-btn").innerText = "Start Test";
    document.getElementById("user-input").disabled = true;
    document.getElementById("user-input").value = "";
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("wpm").innerText = "WPM: 0";
    document.getElementById("accuracy").innerText = "Accuracy: 100%";
}

// Function to check the user's typing progress
function checkTyping() {
    const userInput = document.getElementById("user-input").value;
    const passageWords = passage.split(" ");
    const userWords = userInput.split(" ");

    totalWords = userWords.length;
    correctWords = 0;

    // Count the number of correctly typed words
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === passageWords[i]) {
            correctWords++;
        }
    }

    // Calculate WPM
    calculateWPM();
    calculateAccuracy();
}

// Function to calculate WPM (Words Per Minute)
function calculateWPM() {
    const wpm = (correctWords / 60) * 60;  // Correct words per minute
    document.getElementById("wpm").innerText = `WPM: ${Math.floor(wpm)}`;
}

// Function to calculate accuracy percentage
function calculateAccuracy() {
    const accuracy = (correctWords / totalWords) * 100;
    document.getElementById("accuracy").innerText = `Accuracy: ${Math.round(accuracy)}%`;
}

// Toggle music on and off
function toggleMusic() {
    let music = document.getElementById("background-music");

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
