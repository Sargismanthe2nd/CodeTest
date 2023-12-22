let currentQuestion = 0;

function beginQuiz() {
    showQuestion();
}
function showQuestion() {
    const currentQuestion = testQuestions[currentQuestion];
    document.getElementById("question").textContent = currentQuestion.question;

    const answerButton = document.getElementById("answerButton");
    answerButton.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("button");
        button.onclick = () => checkAnswer(option);
        answerButton.appendChild(button);
    });

}
const testQuestions = [
    {
        question: "What does JS mean?",
        options: ["Jail Sentence", "Japanese Sushi", "JavaScript", "Javas Crypt"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is JavaScript?",
        options: ["A programming language", "A play about coffee", "Ancient writings", "An otherworldy language"],
        correctAnswer: "A programming language"
    },
];
beginQuiz();