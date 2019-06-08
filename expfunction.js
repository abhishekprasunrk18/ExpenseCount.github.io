// Get DOM Elements
const btnAddEl = document.querySelector("#btnAdd");
const expDescEl = document.querySelector("#expDesc");
const expAmountEl = document.querySelector("#expAmount");
const headingTotalEl = document.querySelector("#headingTotal");
const expenseTableEl = document.querySelector("#expenseTable");
const allExpenses = [];

// Intitializing variable totalExpense to Zero
let totalExpense = 0;

// Printing initial Total Expense in DOM
headingTotalEl.textContent = `Total Expense: ${totalExpense}`;

//Adding Service worker
if('serviceWorker' in navigator){
    window.addEventListener('load',() =>{
        navigator.serviceWorker.register('/sw.js');
    });
}

// Controller Functions

//function to add expense to total expense
function addExpenseToTotal() {

    const numExpAmount = parseInt(expAmountEl.value);
    totalExpense = totalExpense + numExpAmount;

    const expense = {}
    expense.desc = expDescEl.value;
    expense.amount = numExpAmount;
    expense.moment = new Date();
    allExpenses.push(expense);
    totalExpenseViewer(totalExpense);
    renderListOfExpense(allExpenses);
    clearFields();

}
// Function to delete expense from the table
function deleteExpenseItemFromTotal(dateValue) {

    allExpenses.forEach(item => {
        if (item.moment.valueOf() === dateValue) {
            let pos = allExpenses.indexOf(item);
            allExpenses.splice(pos, 1);
            totalExpense -= item.amount;
        }
    });
    totalExpenseViewer(totalExpense);
    renderListOfExpense(allExpenses);

    // const newAllExpenses = allExpenses.filter((expenseObj) => {
    //     if (expenseObj.moment.valueOf() !== dateValue) {
    //         return expenseObj;
    //     }
    // });

    // const deleteExpenseItem = allExpenses.filter((expenseObj) => expenseObj.moment.valueOf() === dateValue);
    // totalExpense= totalExpense-deleteExpenseItem[0].amount;
    // totalExpenseViewer(totalExpense);
    // const newAllExpenses = allExpenses.filter((expenseObj) => expenseObj.moment.valueOf() !== dateValue);
    // renderListOfExpense(newAllExpenses);
}
//clear fieldfunction
function clearFields() {
    expAmountEl.value = "";
    expDescEl.value = "";
}
// Get Date String
function getDateString(currentmoment) {
    return currentmoment.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

// Click Add Event Listner
btnAddEl.addEventListener("click", addExpenseToTotal, false);

// View Layer

// totalExpense HTML Viewer
function totalExpenseViewer(totalExpense) {
    headingTotalEl.textContent = `Total Expense: ${totalExpense}`;
}

// List Of Expense HTML Viewer
function renderListOfExpense(allExpensesArr) {
    const allExpensesHTML = allExpensesArr.map(expenseItem => createListItem(expenseItem)).join("");
    expenseTableEl.innerHTML = allExpensesHTML;
}
// Templete creation of Expense Item 
function createListItem({ desc, amount, moment }) {
    return `<li class="list-group-item d-flex justify-content-between">
						<div class="d-flex flex-column">
                            ${desc}
							<small class="text-muted">${getDateString(moment)}
                            </small>
						</div>
						<div>
							<span class="px-5">
                                ${amount}
							</span>
							<button 
                                type="button" 
                                class="btn btn-outline-danger btn-sm" 
                                onclick="deleteExpenseItemFromTotal(${moment.valueOf()})">
								<i class="fas fa-trash-alt"></i>
							</button>
						</div>
					</li>`
}
