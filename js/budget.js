document.addEventListener("DOMContentLoaded", () => {
  const form = qs("[data-budget-form]");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const data = storage.get();
    data.budgets.push({ category: values.category, limit: Number(values.limit), spent: 0 });
    storage.set(data);
    showToast("Budget created.");
    setTimeout(() => location.reload(), 600);
  });
});
