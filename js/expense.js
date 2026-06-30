document.addEventListener("DOMContentLoaded", () => {
  const quickExpense = qs("[data-quick-expense]");
  if (!quickExpense) return;
  quickExpense.addEventListener("click", () => qs("[data-open-modal]")?.click());
});
