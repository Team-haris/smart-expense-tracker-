document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.dataset.appPage) return;
  renderMobileNav();
  const data = storage.get();
  const summary = getSummary(data.transactions);

  updateSummaryCards(summary);
  renderTransactions(data.transactions);
  renderBudgets(data.budgets);
  renderGoals(data.goals);
  renderProfile(data.user);
  bindModal();
  bindFilters();
  bindProfileForm();
});

function updateSummaryCards(summary) {
  const values = {
    balance: summary.balance,
    income: summary.income,
    expenses: summary.expenses,
    savings: summary.savings
  };
  Object.entries(values).forEach(([key, value]) => {
    qsa(`[data-summary="${key}"]`).forEach(node => node.textContent = formatCurrency(value));
  });
}

function renderTransactions(transactions) {
  const body = qs("[data-transactions]");
  if (!body) return;
  const limit = Number(body.dataset.limit || transactions.length);
  const rows = transactions.slice(0, limit).map(item => `
    <tr data-type="${item.type}" data-category="${item.category}">
      <td>
        <div class="transaction-meta">
          <span class="category-dot"><i class="fa-solid ${categoryIcon(item.category)}"></i></span>
          <div><strong>${item.title}</strong><br><span class="panel-muted">${item.category}</span></div>
        </div>
      </td>
      <td>${formatDate(item.date)}</td>
      <td>${item.method}</td>
      <td><span class="badge ${item.type}">${item.type}</span></td>
      <td><strong>${item.type === "expense" ? "-" : "+"}${formatCurrency(item.amount)}</strong></td>
    </tr>
  `).join("");
  body.innerHTML = rows || `<tr><td colspan="5">No transactions yet.</td></tr>`;
}

function renderBudgets(budgets) {
  const target = qs("[data-budgets]");
  if (!target) return;
  target.innerHTML = budgets.map(item => {
    const percent = Math.min(Math.round((item.spent / item.limit) * 100), 100);
    return `
      <div class="budget-row">
        <div class="row-between"><strong>${item.category}</strong><span>${percent}%</span></div>
        <div class="progress"><span style="width:${percent}%"></span></div>
        <div class="row-between panel-muted"><span>${formatCurrency(item.spent)} spent</span><span>${formatCurrency(item.limit - item.spent)} left</span></div>
      </div>
    `;
  }).join("");
}

function renderGoals(goals) {
  const target = qs("[data-goals]");
  if (!target) return;
  target.innerHTML = goals.map(item => {
    const percent = Math.min(Math.round((item.saved / item.target) * 100), 100);
    return `
      <div class="goal-row">
        <div class="row-between"><strong>${item.name}</strong><span>${formatCurrency(item.saved)}</span></div>
        <div class="progress"><span style="width:${percent}%"></span></div>
        <div class="panel-muted">${percent}% of ${formatCurrency(item.target)}</div>
      </div>
    `;
  }).join("");
}

function renderProfile(user) {
  qsa("[data-user-name]").forEach(node => node.textContent = user.name);
  qsa("[data-user-email]").forEach(node => node.textContent = user.email);
  qsa("[name='name']").forEach(node => node.value = user.name);
  qsa("[name='email']").forEach(node => node.value = user.email);
  qsa("[name='phone']").forEach(node => node.value = user.phone || "");
}

function bindModal() {
  const modal = qs("[data-modal]");
  if (!modal) return;
  const form = qs("[data-transaction-form]");
  qsa("[data-open-modal]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      modal.classList.add("show");
    });
  });
  qsa("[data-close-modal]").forEach(button => button.addEventListener("click", () => modal.classList.remove("show")));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const transaction = Object.fromEntries(new FormData(form).entries());
    transaction.title = transaction.description || transaction.category;
    storage.addTransaction(transaction);
    showToast("Transaction saved.");
    setTimeout(() => location.reload(), 600);
  });
}

function bindFilters() {
  const search = qs("[data-table-search]");
  const type = qs("[data-type-filter]");
  if (!search && !type) return;
  const apply = () => {
    const term = (search?.value || "").toLowerCase();
    const chosen = type?.value || "all";
    qsa("[data-transactions] tr").forEach(row => {
      const matchesTerm = row.textContent.toLowerCase().includes(term);
      const matchesType = chosen === "all" || row.dataset.type === chosen;
      row.style.display = matchesTerm && matchesType ? "" : "none";
    });
  };
  search?.addEventListener("input", apply);
  type?.addEventListener("change", apply);
}

function bindProfileForm() {
  const form = qs("[data-profile-form]");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    storage.updateUser(Object.fromEntries(new FormData(form).entries()));
    showToast("Profile updated.");
  });
}
