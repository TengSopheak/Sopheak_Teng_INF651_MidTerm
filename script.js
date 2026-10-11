"use strict";

/*
  JavaScript Midterm
  Mini Expense Tracker

  Complete the application using the requirements
  provided in the exam instructions.
*/

// ------------------------------------
// 1. SELECT DOM ELEMENTS
// ------------------------------------

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addExpenseButton = document.getElementById("add-expense");
const resetButton = document.getElementById("reset");
const expenseList = document.getElementById("expense-list");
const expenseCount = document.getElementById("expense-count");
const totalDisplay = document.getElementById("total");
const budgetStatus = document.getElementById("budget-status");
const message = document.getElementById("message");

// ------------------------------------
// 2. APPLICATION DATA
// ------------------------------------

// Create an empty array for expenses.
// Create a variable or constant for the budget.
const expenses = [];
const budget = 500;

// ------------------------------------
// 3. FUNCTIONS
// ------------------------------------

// Create a function for adding an expense.
function showMessage(text, type) {
    message.textContent = text;
    message.className = type ? `message ${type}` : "message";
}

function clearForm() {
    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.selectedIndex = 0;
}

function addExpense() {
    const description = descriptionInput.value.trim();
    const amountText = amountInput.value.trim();
    const amount = Number(amountText);
    const category = categorySelect.value;

    if (description === "") {
        showMessage("Please enter an expense description.", "error");
        return;
    }

    if (amountText === "") {
        showMessage("Please enter an expense amount.", "error");
        return;
    }

// Create a function for displaying expenses.
    if (!Number.isFinite(amount)) {
        showMessage("Please enter a valid number for the amount.", "error");
        return;
    }

// Create a function for calculating the total.
    if (amount <= 0) {
        showMessage("The expense amount must be greater than 0.", "error");
        return;
    }

    if (amount < 0.01) {
        showMessage("The expense amount must be at least $0.01.", "error");
        return;
    }

    const expense = { description, amount, category };
    expenses.push(expense);

// Create a function for updating the budget status.
    displayExpenses();
    showMessage("Expense added successfully.", "success");
    clearForm();
}

// Create a function for resetting the application.
function displayExpenses() {
    expenseList.textContent = "";

    if (expenses.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No expenses have been added yet.";
        expenseList.appendChild(emptyMessage);
    }

    for (const expense of expenses) {
        const item = document.createElement("div");
        item.className = "expense-item";

        // Treat user input as text so descriptions cannot insert HTML.
        const description = document.createElement("span");
        description.className = "expense-description";
        description.textContent = expense.description;

        const category = document.createElement("span");
        category.className = "expense-category";
        category.textContent = expense.category;

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = `$${expense.amount.toFixed(2)}`;

        item.appendChild(description);
        item.appendChild(category);
        item.appendChild(amount);
        expenseList.appendChild(item);
    }

    expenseCount.textContent = `${expenses.length} Expenses`;
    const total = calculateTotal();
    totalDisplay.textContent = `$${total.toFixed(2)}`;
    updateBudgetStatus(total);
}

function calculateTotal() {
    let total = 0;

    for (const expense of expenses) {
        total += expense.amount;
    }

    // Round before comparing with the budget to avoid floating-point drift.
    return Number(total.toFixed(2));
}

function updateBudgetStatus(total) {
    if (total <= budget) {
        budgetStatus.textContent = "You are under budget.";
        budgetStatus.className = "budget-status under-budget";
    } else {
        budgetStatus.textContent = "You are over budget.";
        budgetStatus.className = "budget-status over-budget";
    }
}

function resetApplication() {
    expenses.length = 0;
    displayExpenses();
    showMessage("", "");
    clearForm();
}

// ------------------------------------
// 4. EVENT LISTENERS
// ------------------------------------

// Add an event listener to the Add Expense button.
// Add an event listener to the Reset button.
addExpenseButton.addEventListener("click", addExpense);
resetButton.addEventListener("click", resetApplication);
