const formatCurrency = value => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(value);

const formatDate = value => new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
}).format(new Date(value));

const qs = selector => document.querySelector(selector);
const qsa = selector => [...document.querySelectorAll(selector)];

function getSummary(transactions) {
  const income = transactions
    .filter(item => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter(item => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);
  return {
    income,
    expenses,
    balance: income - expenses,
    savings: Math.max(income - expenses, 0)
  };
}

function showToast(message) {
  let toast = qs(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function categoryIcon(category) {
  const icons = {
    Food: "fa-utensils",
    Travel: "fa-plane",
    Shopping: "fa-bag-shopping",
    Education: "fa-graduation-cap",
    Entertainment: "fa-ticket",
    Healthcare: "fa-heart-pulse",
    Rent: "fa-house",
    Bills: "fa-file-invoice",
    Salary: "fa-wallet",
    Freelancing: "fa-laptop-code",
    Investments: "fa-chart-line"
  };
  return icons[category] || "fa-receipt";
}

function renderMobileNav() {
  if (document.querySelector(".mobile-nav")) return;
  const nav = document.createElement("nav");
  nav.className = "mobile-nav";
  nav.innerHTML = `
    <a href="dashboard.html"><i class="fa-solid fa-chart-pie"></i><span>Home</span></a>
    <a href="transactions.html"><i class="fa-solid fa-list"></i><span>Transactions</span></a>
    <a href="#" data-open-modal><i class="fa-solid fa-plus"></i><span>Add</span></a>
    <a href="reports.html"><i class="fa-solid fa-file-lines"></i><span>Reports</span></a>
    <a href="profile.html"><i class="fa-solid fa-user"></i><span>Profile</span></a>
  `;
  document.body.appendChild(nav);
}
