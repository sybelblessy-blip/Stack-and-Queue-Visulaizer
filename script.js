// Store the current data structure
let currentType = "";
let stack = [];
let queue = [];
let history = [];

// Open Stack or Queue
function openSection(type) {

    currentType = type;
    history = [];

    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("operationPage").classList.remove("hidden");

    if (type === "stack") {
        document.getElementById("operationTitle").innerText = "🟣 Stack Operations";
        document.getElementById("operationDescription").innerText =
            "LIFO — Last In, First Out";
    } else {
        document.getElementById("operationTitle").innerText = "🔵 Queue Operations";
        document.getElementById("operationDescription").innerText =
            "FIFO — First In, First Out";
    }

    createButtons();
    displayStructure();
    showMessage("Choose an operation to begin!");
    displayHistory();
}

// Return to the home page
function goHome() {

    document.getElementById("operationPage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
}

// Create buttons based on the selected structure
function createButtons() {

    let buttons = "";

    if (currentType === "stack") {

        buttons = `
            <button onclick="pushElement()">➕ Push</button>
            <button onclick="popElement()">➖ Pop</button>
            <button onclick="peekElement()">👀 Peek</button>
            <button onclick="displayOperation()">📋 Display</button>
            <button onclick="checkEmpty()">❓ Is Empty?</button>
            <button onclick="checkFull()">🔒 Is Full?</button>
            <button onclick="showSize()">📏 Size</button>
        `;

    } else {

        buttons = `
            <button onclick="enqueueElement()">➕ Enqueue</button>
            <button onclick="dequeueElement()">➖ Dequeue</button>
            <button onclick="frontElement()">👀 Front</button>
            <button onclick="displayOperation()">📋 Display</button>
            <button onclick="checkEmpty()">❓ Is Empty?</button>
            <button onclick="checkFull()">🔒 Is Full?</button>
            <button onclick="showSize()">📏 Size</button>
        `;
    }

    document.getElementById("operationButtons").innerHTML = buttons;
}

// Get the selected structure
function getData() {
    return currentType === "stack" ? stack : queue;
}

// Read the maximum capacity
function getCapacity() {

    let capacity = Number(document.getElementById("capacityInput").value);

    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 20) {
        showMessage("⚠️ Capacity must be between 1 and 20.");
        return 0;
    }

    return capacity;
}

// Read and validate an element
function getInputValue() {

    let input = document.getElementById("elementInput").value.trim();

    if (input === "") {
        showMessage("⚠️ Please enter an element first.");
        return null;
    }

    return input;
}

// Push into Stack
function pushElement() {

    let value = getInputValue();

    if (value === null) return;

    let capacity = getCapacity();

    if (capacity === 0) return;

    if (stack.length >= capacity) {
        showMessage("🚨 Stack Overflow! The stack is full.");
        addHistory("Push failed: Stack Overflow");
        return;
    }

    stack.push(value);

    document.getElementById("elementInput").value = "";

    showMessage("✅ " + value + " pushed onto the stack.");

    addHistory("Push " + value);
    displayStructure();
}

// Pop from Stack
function popElement() {

    if (stack.length === 0) {
        showMessage("🚨 Stack Underflow! The stack is empty.");
        addHistory("Pop failed: Stack Underflow");
        return;
    }

    let removed = stack.pop();

    showMessage("✅ " + removed + " popped from the stack.");

    addHistory("Pop " + removed);
    displayStructure();
}

// Peek at Stack
function peekElement() {

    if (stack.length === 0) {
        showMessage("⚠️ Stack is empty. Nothing to peek.");
        return;
    }

    showMessage("👀 Top element: " + stack[stack.length - 1]);

    addHistory("Peek: " + stack[stack.length - 1]);
}

// Enqueue into Queue
function enqueueElement() {

    let value = getInputValue();

    if (value === null) return;

    let capacity = getCapacity();

    if (capacity === 0) return;

    if (queue.length >= capacity) {
        showMessage("🚨 Queue Overflow! The queue is full.");
        addHistory("Enqueue failed: Queue Overflow");
        return;
    }

    queue.push(value);

    document.getElementById("elementInput").value = "";

    showMessage("✅ " + value + " added to the rear of the queue.");

    addHistory("Enqueue " + value);
    displayStructure();
}

// Dequeue from Queue
function dequeueElement() {

    if (queue.length === 0) {
        showMessage("🚨 Queue Underflow! The queue is empty.");
        addHistory("Dequeue failed: Queue Underflow");
        return;
    }

    let removed = queue.shift();

    showMessage("✅ " + removed + " removed from the front of the queue.");

    addHistory("Dequeue " + removed);
    displayStructure();
}

// View Queue Front
function frontElement() {

    if (queue.length === 0) {
        showMessage("⚠️ Queue is empty. No front element.");
        return;
    }

    showMessage("👀 Front element: " + queue[0]);

    addHistory("Front: " + queue[0]);
}

// Display current structure
function displayStructure() {

    let data = getData();
    let display = "";

    data.forEach(function(value, index) {

        if (currentType === "stack") {

            display =
                `<div class="data-item">
                    ${escapeHTML(value)}
                    ${index === data.length - 1 ? "<br>⬆ TOP" : ""}
                </div>` + display;

        } else {

            display +=
                `<div class="data-item queue-item">
                    ${index === 0 ? "FRONT<br>" : ""}
                    ${escapeHTML(value)}
                    ${index === data.length - 1 ? "<br>REAR" : ""}
                </div>`;
        }
    });

    if (data.length === 0) {
        display = "<p>No elements yet. Add an element to begin!</p>";
    }

    document.getElementById("structureDisplay").innerHTML = display;
}

// Display operation message
function showMessage(message) {
    document.getElementById("statusMessage").innerText = message;
}

// Add to history
function addHistory(message) {

    history.unshift(message);

    displayHistory();
}

// Display operation history
function displayHistory() {

    let list = "";

    history.forEach(function(item) {
        list += "<li>" + escapeHTML(item) + "</li>";
    });

    if (history.length === 0) {
        list = "<li>No operations performed yet.</li>";
    }

    document.getElementById("historyList").innerHTML = list;
}

// Check if empty
function checkEmpty() {

    let data = getData();
    let result = data.length === 0;

    showMessage(result ? "✅ Yes, it is empty." : "❌ No, it is not empty.");

    addHistory("Is Empty? " + (result ? "Yes" : "No"));
}

// Check if full
function checkFull() {

    let capacity = getCapacity();

    if (capacity === 0) return;

    let result = getData().length >= capacity;

    showMessage(result ? "🔒 Yes, it is full." : "✅ No, it is not full.");

    addHistory("Is Full? " + (result ? "Yes" : "No"));
}

// Show current size
function showSize() {

    let size = getData().length;

    showMessage("📏 Current size: " + size);

    addHistory("Size: " + size);
}

// Display operation
function displayOperation() {

    displayStructure();

    showMessage("📋 Displayed all current elements.");

    addHistory("Display elements");
}

// Reset current structure
function resetStructure() {

    if (currentType === "stack") {
        stack = [];
    } else {
        queue = [];
    }

    history = [];

    document.getElementById("elementInput").value = "";

    displayStructure();
    displayHistory();

    showMessage("🔄 Structure reset successfully!");
}

// Safely display user-entered text
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}
