
const API = "http://localhost:4000/expenses";

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const submitBtn = document.getElementById("submitBtn");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const editIdInput = document.getElementById("editId");

window.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses() {
    try {
        const res = await axios.get(API);
        renderExpenses(res.data);
    } catch (err) {
        console.error(err);
    }

}

function renderExpenses(expenses) {
    expenseList.innerHTML = "";
    
    expenses.forEach(exp => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
                        <td>${exp.title}</td>
                        <td>₹${exp.amount}</td>
                        <td>${exp.date}</td>
                        <td>
                            <button class="btn btn-warning btn-sm me-1" onclick="editExpense(${exp.id},'${exp.title}',${exp.amount},'${exp.date}')"> Edit </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${exp.id})"> Delete </button>
                        </td>`;

        expenseList.appendChild(tr);
    });
}



/* Add or Update Expense */

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = titleInput.value;
    const amount = amountInput.value;
    const date = dateInput.value;
    const id = editIdInput.value;

    try {
        if (id) {
            await axios.put(`${API}/${id}`, { title, amount, date });
            submitBtn.innerText = "Add";
            editIdInput.value = "";
        } else {
            await axios.post(API, { title, amount, date });
        }
        form.reset();
        loadExpenses();
    } catch (err) {
        console.error(err);
    }
});



/* Delete */
async function deleteExpense(id) {
    try {
        await axios.delete(`${API}/${id}`);
        loadExpenses();
    } catch (err) {
        console.error(err);
    }

}

/* Edit */
function editExpense(id, title, amount, date) {
    titleInput.value = title;
    amountInput.value = amount;
    dateInput.value = date;
    editIdInput.value = id;
    submitBtn.innerText = "Update";
    titleInput.focus();

}