// ======================================
// DSA EXPLORER
// Stack + Queue + Learn Mode + Quiz Mode
// ======================================

let currentType = "";
let stack = [];
let queue = [];
let history = [];

// ======================================
// PAGE NAVIGATION
// ======================================

function hideAllPages() {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("operationPage").classList.add("hidden");
    document.getElementById("learnPage").classList.add("hidden");
    document.getElementById("quizPage").classList.add("hidden");
}

function goHome() {
    hideAllPages();
    document.getElementById("homePage").classList.remove("hidden");
}

function openLearnMode() {
    hideAllPages();
    document.getElementById("learnPage").classList.remove("hidden");
}

function openQuizMode() {
    hideAllPages();
    document.getElementById("quizPage").classList.remove("hidden");
    startQuiz();
}

// ======================================
// STACK AND QUEUE NAVIGATION
// ======================================

function openSection(type) {
    hideAllPages();

    currentType = type;

    document.getElementById("operationPage").classList.remove("hidden");

    document.getElementById("operationTitle").textContent =
        type === "stack" ? "📚 Stack Operations" : "🚶 Queue Operations";

    document.getElementById("operationDescription").textContent =
        type === "stack"
            ? "Last In, First Out (LIFO)"
            : "First In, First Out (FIFO)";

    stack = [];
    queue = [];
    history = [];

    document.getElementById("elementInput").value = "";
    document.getElementById("capacityInput").value = "5";

    createButtons();
    displayOperation();
    showMessage("Choose an operation to begin!");
    displayHistory();
}

function getData() {
    return currentType === "stack" ? stack : queue;
}

function getCapacity() {
    const input = document.getElementById("capacityInput");
    const capacity = Number(input.value);

    if (
        input.value.trim() === "" ||
        !Number.isInteger(capacity) ||
        capacity < 1 ||
        capacity > 20
    ) {
        showMessage("Enter a maximum capacity between 1 and 20.");
        return null;
    }

    if (getData().length > capacity) {
        showMessage(
            "Current elements exceed this capacity. Increase the capacity or remove elements first."
        );
        return null;
    }

    return capacity;
}

function getInputValue() {
    const input = document.getElementById("elementInput");

    if (input.value.trim() === "") {
        showMessage("Please enter a number first!");
        input.focus();
        return null;
    }

    const value = Number(input.value);

    if (!Number.isFinite(value)) {
        showMessage("Please enter a valid number.");
        return null;
    }

    return value;
}

// ======================================
// CREATE OPERATION BUTTONS
// ======================================

function createButtons() {
    const container = document.getElementById("operationButtons");
    container.innerHTML = "";

    let operations;

    if (currentType === "stack") {
        operations = [
            ["Push", pushElement],
            ["Pop", popElement],
            ["Peek", peekElement],
            ["Display", displayOperation],
            ["Is Empty", checkEmpty],
            ["Is Full", checkFull],
            ["Size", showSize]
        ];
    } else {
        operations = [
            ["Enqueue", enqueueElement],
            ["Dequeue", dequeueElement],
            ["Front", frontElement],
            ["Display", displayOperation],
            ["Is Empty", checkEmpty],
            ["Is Full", checkFull],
            ["Size", showSize]
        ];
    }

    operations.forEach(function (operation) {
        const button = document.createElement("button");

        button.textContent = operation[0];
        button.type = "button";
        button.addEventListener("click", operation[1]);

        container.appendChild(button);
    });
}

// ======================================
// STACK OPERATIONS
// ======================================

function pushElement() {
    const capacity = getCapacity();

    if (capacity === null) return;

    const value = getInputValue();

    if (value === null) return;

    if (stack.length >= capacity) {
        showMessage("Stack Overflow! The Stack is full.");
        addHistory("Push failed: Stack Overflow");
        return;
    }

    stack.push(value);

    showMessage(value + " pushed onto the Stack.");
    addHistory("Push: " + value);
    displayOperation();

    document.getElementById("elementInput").value = "";
}

function popElement() {
    if (stack.length === 0) {
        showMessage("Stack Underflow! The Stack is empty.");
        addHistory("Pop failed: Stack Underflow");
        return;
    }

    const removed = stack.pop();

    showMessage(removed + " popped from the Stack.");
    addHistory("Pop: " + removed);
    displayOperation();
}

function peekElement() {
    if (stack.length === 0) {
        showMessage("The Stack is empty!");
        return;
    }

    showMessage("Top element: " + stack[stack.length - 1]);
    addHistory("Peek: " + stack[stack.length - 1]);
}

// ======================================
// QUEUE OPERATIONS
// ======================================

function enqueueElement() {
    const capacity = getCapacity();

    if (capacity === null) return;

    const value = getInputValue();

    if (value === null) return;

    if (queue.length >= capacity) {
        showMessage("Queue Overflow! The Queue is full.");
        addHistory("Enqueue failed: Queue Overflow");
        return;
    }

    queue.push(value);

    showMessage(value + " added to the rear of the Queue.");
    addHistory("Enqueue: " + value);
    displayOperation();

    document.getElementById("elementInput").value = "";
}

function dequeueElement() {
    if (queue.length === 0) {
        showMessage("Queue Underflow! The Queue is empty.");
        addHistory("Dequeue failed: Queue Underflow");
        return;
    }

    const removed = queue.shift();

    showMessage(removed + " removed from the front of the Queue.");
    addHistory("Dequeue: " + removed);
    displayOperation();
}

function frontElement() {
    if (queue.length === 0) {
        showMessage("The Queue is empty!");
        return;
    }

    showMessage("Front element: " + queue[0]);
    addHistory("Front: " + queue[0]);
}

// ======================================
// DISPLAY STRUCTURE
// ======================================

function displayOperation() {
    const container = document.getElementById("structureDisplay");
    container.innerHTML = "";

    const data = getData();

    if (data.length === 0) {
        container.textContent = "No elements yet.";
        return;
    }

    if (currentType === "stack") {
        const topLabel = document.createElement("p");
        topLabel.textContent = "TOP ↓";
        topLabel.style.width = "100%";
        topLabel.style.textAlign = "center";
        topLabel.style.color = "#00e5ff";
        topLabel.style.fontWeight = "bold";

        container.appendChild(topLabel);

        for (let i = data.length - 1; i >= 0; i--) {
            const item = document.createElement("div");

            item.className = "data-item";
            item.textContent = data[i];

            if (i === data.length - 1) {
                item.textContent += "  ← TOP";
            }

            container.appendChild(item);
        }
    } else {
        const frontLabel = document.createElement("p");
        frontLabel.textContent = "FRONT →";
        frontLabel.style.color = "#00e5ff";
        frontLabel.style.fontWeight = "bold";

        container.appendChild(frontLabel);

        data.forEach(function (value, index) {
            const item = document.createElement("div");

            item.className = "queue-item";
            item.textContent = value;

            if (index === 0) {
                item.textContent += " (FRONT)";
            }

            if (index === data.length - 1) {
                item.textContent += " (REAR)";
            }

            container.appendChild(item);
        });
    }
}

// ======================================
// STATUS AND HISTORY
// ======================================

function showMessage(message) {
    document.getElementById("statusMessage").textContent = message;
}

function addHistory(message) {
    history.unshift(message);
    displayHistory();
}

function displayHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(function (message) {
        const item = document.createElement("li");
        item.textContent = message;
        list.appendChild(item);
    });
}

function checkEmpty() {
    const empty = getData().length === 0;

    showMessage(
        empty ? "Yes, the structure is empty." : "No, the structure is not empty."
    );

    addHistory("Is Empty: " + (empty ? "Yes" : "No"));
}

function checkFull() {
    const capacity = getCapacity();

    if (capacity === null) return;

    const full = getData().length >= capacity;

    showMessage(
        full ? "Yes, the structure is full." : "No, the structure is not full."
    );

    addHistory("Is Full: " + (full ? "Yes" : "No"));
}

function showSize() {
    const size = getData().length;

    showMessage("Current size: " + size);
    addHistory("Size: " + size);
}

function resetStructure() {
    stack = [];
    queue = [];
    history = [];

    displayOperation();
    displayHistory();

    showMessage("Structure reset successfully!");
}

// ======================================
// QUIZ QUESTIONS
// ======================================

const quizQuestions = [
    {
        question: "Which principle does a Stack follow?",
        options: ["FIFO", "LIFO", "Random order", "Alphabetical order"],
        answer: 1,
        explanation: "Stack follows LIFO: Last In, First Out."
    },
    {
        question: "Which principle does a Queue follow?",
        options: ["LIFO", "Random order", "FIFO", "Priority only"],
        answer: 2,
        explanation: "Queue follows FIFO: First In, First Out."
    },
    {
        question: "Which Stack operation inserts an element?",
        options: ["Pop", "Peek", "Dequeue", "Push"],
        answer: 3,
        explanation: "Push inserts a new element onto the Stack."
    },
    {
        question: "Which Stack operation removes the top element?",
        options: ["Push", "Pop", "Peek", "Front"],
        answer: 1,
        explanation: "Pop removes the top element from a Stack."
    },
    {
        question: "Where is a new element inserted in a Queue?",
        options: ["Front", "Middle", "Rear", "Top"],
        answer: 2,
        explanation: "Enqueue inserts a new element at the rear."
    },
    {
        question: "Which Queue operation removes an element?",
        options: ["Push", "Peek", "Enqueue", "Dequeue"],
        answer: 3,
        explanation: "Dequeue removes an element from the front."
    },
    {
        question: "What is Stack Overflow?",
        options: [
            "Removing from an empty Stack",
            "Inserting into a full Stack",
            "Viewing the top element",
            "Displaying all elements"
        ],
        answer: 1,
        explanation: "Stack Overflow occurs when insertion is attempted on a full Stack."
    },
    {
        question: "What is Stack Underflow?",
        options: [
            "Inserting into a full Stack",
            "Displaying a Stack",
            "Removing from an empty Stack",
            "Checking the Stack size"
        ],
        answer: 2,
        explanation: "Stack Underflow occurs when removal is attempted on an empty Stack."
    },
    {
        question: "What is the time complexity of Push in a typical Stack implementation?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: 3,
        explanation: "Push normally takes O(1) time when capacity is available."
    },
    {
        question: "Which data structure is commonly used to manage function calls?",
        options: ["Stack", "Queue only", "Graph only", "Array sorting"],
        answer: 0,
        explanation: "Function calls are commonly managed using a call stack."
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

// ======================================
// START OR RESTART QUIZ
// ======================================

function startQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    quizAnswered = false;

    document.getElementById("quizResult").classList.add("hidden");
    document.querySelector(".quiz-panel").classList.remove("hidden");

    document.getElementById("currentScore").textContent = "Score: 0";

    showQuestion();
}

// ======================================
// SHOW QUESTION
// ======================================

function showQuestion() {
    quizAnswered = false;

    const question = quizQuestions[currentQuestion];

    document.getElementById("questionCounter").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + quizQuestions.length;

    document.getElementById("currentScore").textContent =
        "Score: " + quizScore;

    document.getElementById("questionText").textContent =
        question.question;

    document.getElementById("quizFeedback").textContent = "";

    document.getElementById("nextQuestionButton").classList.add("hidden");

    document.getElementById("quizProgress").style.width =
        ((currentQuestion + 1) / quizQuestions.length * 100) + "%";

    const optionsContainer = document.getElementById("answerOptions");
    optionsContainer.innerHTML = "";

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = option;
        button.type = "button";

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// ======================================
// CHECK ANSWER
// ======================================

function checkAnswer(selectedIndex) {
    if (quizAnswered) return;

    quizAnswered = true;

    const question = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-option");
    const feedback = document.getElementById("quizFeedback");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === question.answer) {
        quizScore++;

        buttons[selectedIndex].classList.add("correct-answer");

        feedback.textContent = "✅ Correct! " + question.explanation;
    } else {
        buttons[selectedIndex].classList.add("wrong-answer");
        buttons[question.answer].classList.add("correct-answer");

        feedback.textContent = "❌ Not quite! " + question.explanation;
    }

    document.getElementById("currentScore").textContent =
        "Score: " + quizScore;

    const nextButton = document.getElementById("nextQuestionButton");

    nextButton.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "View Results 🏆"
            : "Next Question →";

    nextButton.classList.remove("hidden");
}

// ======================================
// NEXT QUESTION
// ======================================

function nextQuestion() {
    if (!quizAnswered) return;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

// ======================================
// FINAL QUIZ RESULT
// ======================================

function showQuizResult() {
    document.querySelector(".quiz-panel").classList.add("hidden");

    const result = document.getElementById("quizResult");
    result.classList.remove("hidden");

    document.getElementById("finalScore").textContent =
        "Your Score: " + quizScore + " / " + quizQuestions.length;

    let message;

    if (quizScore === 10) {
        message = "🌟 Perfect score! You are a DSA champion!";
    } else if (quizScore >= 8) {
        message = "🎉 Excellent work! You understand these concepts well.";
    } else if (quizScore >= 5) {
        message = "👍 Good effort! Review Learn Mode and try again.";
    } else {
        message = "💪 Keep practising! Learn Mode will help you improve.";
    }

    document.getElementById("finalMessage").textContent = message;
}