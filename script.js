// script.js

let currentQuestion = 0;
let score = 0;
let time = 60; // Initial time in seconds
let timerInterval;

function beginQuiz() {
    startTimer();
    showQuestion();
    quizReshape();
}

function showQuestion() {
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
        ("Correct!!");
        score++;
    } else {
        ("Incorrect :(");
        time -= 10;
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
        document.getElementById("timer").textContent = "Time left: " + time + " seconds";

        if (time <= 0) {
            endQuiz();
        }

        time--;
    }, 1000); // Update every 1000 milliseconds (1 second)
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    alert("Quiz completed! Your score is: " + score);
    // You can add more logic here, such as displaying the final score or navigating to another page.
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
    {
        question: "In JavaScript, what is a closure?",
        options: ["A function that has no return statement", "A variable declared inside a function", "A combination of a function and the lexical environment within which that function was declared", "A loop that never ends"],
        correctAnswer: "A combination of a function and the lexical environment within which that function was declared",
    },
    {
        question: "What is the purpose of the 'JSON.stringify()' method in JavaScript?",
        options: ["To parse a JSON string", "To convert a JavaScript object to a JSON string", "To extract a value from a JSON object", "To check if a variable is an array"],
        correctAnswer: "To convert a JavaScript object to a JSON string",
    },
];

function leaderboard() {
    document.getElementById("leaderboardContainer").style.display = "block";
}
function startReshape() {
    document.getElementById("quizContainer").style.height = "50%";
}