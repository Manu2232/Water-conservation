// Water Usage Calculator
function calculateWaterUsage() {
    // Get input values with fallback to 0 if empty
    const showerTime = document.getElementById('shower-time').value || 0;
    const toiletFlushes = document.getElementById('toilet-flushes').value || 0;
    const dishWashes = document.getElementById('dish-washes').value || 0;
    const laundryLoads = document.getElementById('laundry-loads').value || 0;

    // Validate inputs
    if (!showerTime || !toiletFlushes || !dishWashes || !laundryLoads) {
        alert('Please fill in all fields!');
        return;
    }

    // Convert to numbers
    const showerTimeNum = Number(showerTime);
    const toiletFlushesNum = Number(toiletFlushes);
    const dishWashesNum = Number(dishWashes);
    const laundryLoadsNum = Number(laundryLoads);

    // Average water usage per activity (in gallons)
    const showerUsage = showerTimeNum * 2.5; // 2.5 gallons per minute
    const toiletUsage = toiletFlushesNum * 1.6; // 1.6 gallons per flush
    const dishUsage = dishWashesNum * 6; // 6 gallons per wash
    const laundryUsage = laundryLoadsNum * 25; // 25 gallons per load

    const totalUsage = showerUsage + toiletUsage + dishUsage + laundryUsage;
    document.getElementById('water-usage-result').textContent = `Your estimated daily water usage: ${totalUsage.toFixed(1)} gallons`;
    
    // Show tips based on usage
    if (totalUsage > 50) {
        document.getElementById('water-usage-result').innerHTML += `
            <p class="usage-tip">Tip: Consider reducing shower time and fixing any leaks to save water!</p>`;
    }

    // Show comparison to average usage
    const averageUsage = 45; // Average daily water usage in gallons
    if (totalUsage > averageUsage) {
        document.getElementById('water-usage-result').innerHTML += `
            <p class="usage-comparison">You use more water than the average household. Consider implementing some of our conservation tips!</p>`;
    } else {
        document.getElementById('water-usage-result').innerHTML += `
            <p class="usage-comparison">Great job! Your water usage is below average!</p>`;
    }
}

// Water Conservation Quiz
const quizQuestions = [
    {
        question: "What percentage of water is used for agriculture globally?",
        options: ["30%", "50%", "70%", "90%"],
        correctAnswer: "70%"
    },
    {
        question: "How much water can be saved by fixing a leaky faucet?",
        options: ["500 gallons", "1,000 gallons", "3,000 gallons", "5,000 gallons"],
        correctAnswer: "3,000 gallons"
    },
    {
        question: "What is the most water-intensive food to produce?",
        options: ["Rice", "Beef", "Chicken", "Potatoes"],
        correctAnswer: "Beef"
    },
    {
        question: "Which of these appliances typically uses the most water?",
        options: ["Dishwasher", "Washing Machine", "Toilet", "Shower"],
        correctAnswer: "Washing Machine"
    },
    {
        question: "How much water can be saved by taking a 5-minute shower instead of a 10-minute shower?",
        options: ["5 gallons", "10 gallons", "15 gallons", "25 gallons"],
        correctAnswer: "25 gallons"
    },
    {
        question: "What is the most water-efficient way to wash dishes?",
        options: ["Hand washing with running water", "Hand washing in a basin", "Using a dishwasher", "Using a dishwasher with half load"],
        correctAnswer: "Using a dishwasher"
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;

// Quiz functions
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) {
        showQuizResults();
        return;
    }

    document.getElementById('quiz-question').textContent = question.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) return;
    
    if (selectedOption === question.correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Results</h2>
            <p>You scored ${score} out of ${quizQuestions.length} correct answers!</p>
            <p>Your water conservation knowledge level: ${getKnowledgeLevel(score)}%</p>
            <button onclick="restartQuiz()" class="quiz-button">Try Again</button>
        </div>
    `;
}

function getKnowledgeLevel(score) {
    const percentage = (score / quizQuestions.length) * 100;
    return Math.round(percentage);
}

function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Clear existing content
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-content">
            <div id="quiz-question"></div>
            <div id="quiz-options"></div>
        </div>
    `;
    
    // Load the first question
    loadQuestion();
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

// Downloadable Resources
const downloadLinks = {
    'water-conservation-guide': 'resources/water-conservation-guide.pdf',
    'water-audit-checklist': 'resources/water-audit-checklist.pdf',
    'gardening-guide': 'resources/water-efficient-gardening.pdf',
    'school-program': 'resources/school-water-conservation-program.pdf',
    'home-infographic': 'resources/water-saving-infographic.pdf'
};

function downloadResource(resourceId) {
    const url = downloadLinks[resourceId];
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Resource not available');
    }
}

// Add click event listeners for download buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('download-resources').onclick = () => downloadResource('water-conservation-guide');
    document.getElementById('download-checklist').onclick = () => downloadResource('water-audit-checklist');
    document.getElementById('download-gardening').onclick = () => downloadResource('gardening-guide');
    document.getElementById('download-school').onclick = () => downloadResource('school-program');
    document.getElementById('download-infographic').onclick = () => downloadResource('home-infographic');
});

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
