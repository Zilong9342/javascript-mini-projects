const addBtn = document.getElementById('addExpense');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load saved data or start empty
let expenses = JSON.parse(localStorage.getItem('myExpenses')) || [];

// 2. Initialize Chart.js
const ctx = document.getElementById('expenseChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'doughnut', // A cool circle chart
    data: {
        labels: ['Food', 'Rent', 'Fun', 'Tech'],
        datasets: [{
            data: [0, 0, 0, 0], // We will update this with real data
            backgroundColor: [
                                '#6366f1', // Indigo
                                '#10b981', // Emerald
                                '#f59e0b', // Amber
                                '#ef4444'  // Rose
                            ]
        }]
    },
    options: { responsive: true }
});

// Update the chart immediately on load
updateChartData();


addBtn.addEventListener('click', () => {
    const desc = descInput.value;
    const amt = parseFloat(amountInput.value);
    const cat = categoryInput.value;

    if (!desc || isNaN(amt)) return;

    expenses.push({ desc, amt, cat });
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
    
    updateChartData();
    descInput.value = '';
    amountInput.value = '';
});


function updateChartData() {
    const totals = { Food: 0, Rent: 0, Fun: 0, Tech: 0 };
    expenseList.innerHTML = ""; // DOM Reset: prevents list duplication

    expenses.forEach((item, index) => {
        totals[item.cat] += item.amt;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.desc} - $${item.amt} (${item.cat})
            <button onclick="deleteExpense(${index})">×</button>
        `;
        expenseList.appendChild(li);
    });

    // Sync Chart.js values
    myChart.data.datasets[0].data = [totals.Food, totals.Rent, totals.Fun, totals.Tech];
    myChart.update();
}

// Function to delete just ONE mistake
window.deleteExpense = function(index) {
    expenses.splice(index, 1); // Remove 1 item at that position
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
    updateChartData();
};

// Function to ZERO the graph (Clear All)
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to wipe all data?")) {
        expenses = [];
        localStorage.removeItem('myExpenses');
        updateChartData();
    }
});