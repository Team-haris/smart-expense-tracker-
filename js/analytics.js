document.addEventListener("DOMContentLoaded", () => {
  if (!window.Chart) return;
  const data = storage.get();
  const expenseItems = data.transactions.filter(item => item.type === "expense");
  const incomeItems = data.transactions.filter(item => item.type === "income");

  drawChart("categoryChart", {
    type: "doughnut",
    data: {
      labels: ["Food", "Rent", "Travel", "Education", "Entertainment"],
      datasets: [{ data: [5200, 18000, 1600, 2200, 1100], backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"] }]
    }
  });

  drawChart("trendChart", {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        { label: "Income", data: [54000, 58000, 60000, 62000, 67000, sum(incomeItems)], borderColor: "#10b981", tension: .4, fill: false },
        { label: "Expenses", data: [32000, 35000, 30000, 38500, 41000, sum(expenseItems)], borderColor: "#ef4444", tension: .4, fill: false }
      ]
    }
  });

  drawChart("barChart", {
    type: "bar",
    data: {
      labels: ["Income", "Expenses", "Savings", "Budget"],
      datasets: [{ data: [sum(incomeItems), sum(expenseItems), getSummary(data.transactions).savings, 20000], backgroundColor: ["#10b981", "#ef4444", "#2563eb", "#f59e0b"], borderRadius: 12 }]
    }
  });
});

function sum(items) {
  return items.reduce((total, item) => total + item.amount, 0);
}

function drawChart(id, config) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  new Chart(canvas, {
    ...config,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: config.type === "doughnut" ? undefined : {
        y: { beginAtZero: true, grid: { color: "rgba(148,163,184,.18)" } },
        x: { grid: { display: false } }
      },
      ...config.options
    }
  });
}
