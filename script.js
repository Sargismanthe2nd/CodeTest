// script.js

let currentQuestion = 0;
let score = 0;
let time = 60; // Initial time in seconds
let timerInterval;

function beginQuiz() {
    startTimer();
    showQuestion();
}

function showQuestion() {
    document.getElementById("question").style.display = 'block';
    document.getElementById("startButton").style.display = 'none';

    const currentQuestionData = testQuestions[currentQuestion];
    document.getElementById("question").textContent = currentQuestionData.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    currentQuestionData.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("button", "answerButtons");
        button.onclick = () => checkAnswer(option);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(userOption) {
    const currentQuestionData = testQuestions[currentQuestion];

    if (userOption === currentQuestionData.correctAnswer) {
        score++;
        let currentScore = score 
        document.getElementById("currentScore").textContent = "Your score: " + currentScore

    } else {
        window.alert("wrong -5 seconds")
        time -= 5;
    }

    currentQuestion++;

    if (currentQuestion < testQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(function () {
        document.getElementById("timer").textContent = "Time: " + time + " seconds";

        if (time <= 0) {
            endQuiz();
        }

        time--;
    }, 1000); // Update every 1000 milliseconds (1 second)
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    saveToLeaderboard();
}

// Test questions, options, and correct answers.
const testQuestions = [
    {
        question: "What does JS mean?",
        options: ["Jail Sentence", "Japanese Sushi", "JavaScript", "Javas Crypt"],
        correctAnswer: "JavaScript",
    },
    {
        question: "What is JavaScript?",
        options: ["A programming language", "A play about coffee", "Ancient writings", "An otherworldly language"],
        correctAnswer: "A programming language",
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "both var and let"],
        correctAnswer: "both var and let",
    },
    {
        question: "What is the purpose of the 'typeof' operator in JavaScript?",
        options: ["To check if a variable is defined", "To determine the type of a value", "To create a new variable", "To compare two values"],
        correctAnswer: "To determine the type of a value",
    },
    {
        question: "What is the 'DOM' in the context of web development?",
        options: ["Data Object Model", "Document Object Model", "Design Object Model", "Dynamic Object Model"],
        correctAnswer: "Document Object Model",
    },

];

function saveToLeaderboard() {
    document.getElementById("quizContent").style.display = 'none';

    const leaderboardContainer = document.getElementById("leaderboardContainer");
    leaderboardContainer.style.display = "block";


    const scoreElement = document.getElementById("scoreResult");
    const finalScore = score;
    scoreResult.textContent = "Your Score: " + score;



    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardList = document.getElementById("leaderboardList");

    leaderboardList.innerHTML = "";

    if (savedScores.length === 0) {
        const noScoresMessage = document.createElement("li");
        noScoresMessage.textContent = "No scores saved yet.";
        leaderboardList.appendChild(noScoresMessage);
    } else {
        savedScores
            .sort((a, b) => b.score - a.score)
            .forEach((entry, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score} points`;
                leaderboardList.appendChild(listItem);
            });
    }
}

function showLeaderboard() {
    displayLeaderboard();
}

document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const initials = document.getElementById('userInitials').value.trim();
    if (initials === '') {
        alert('Please enter your initials.');
        return;
    }
    const savedScores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    savedScores.push({ initials: initials, score: score });
    localStorage.setItem('leaderboard', JSON.stringify(savedScores));
    displayLeaderboard();
    resetQuiz();
});

function displayLeaderboard() {
    const leaderboardContainer = document.getElementById("leaderboardContainer");
    leaderboardContainer.style.display = "block";

    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardList = document.getElementById("leaderboardList");

    leaderboardList.innerHTML = "";

    if (savedScores.length === 0) {
        leaderboardList.innerHTML = "<li>No scores saved yet.</li>";
    } else {
        savedScores.sort((a, b) => b.score - a.score);
        savedScores.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score} points`;
            leaderboardList.appendChild(listItem);
        });
    }
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 60;
    document.getElementById("question").style.display = 'none';
    document.getElementById("startButton").style.display = 'block';
}

function clearScores() {
    localStorage.removeItem('leaderboard');
    displayLeaderboard();
}
