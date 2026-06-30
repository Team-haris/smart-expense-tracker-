document.addEventListener("DOMContentLoaded", () => {
  const form = qs("[data-auth-form]");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.email || !data.password) {
      showToast("Please fill all required fields.");
      return;
    }
    if (form.dataset.authForm === "register" && data.password !== data.confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }
    localStorage.setItem("smartExpenseSession", JSON.stringify({ email: data.email, loggedInAt: Date.now() }));
    if (data.name) storage.updateUser({ name: data.name, email: data.email, phone: data.phone || "" });
    showToast("Welcome to Smart Expense Tracker.");
    setTimeout(() => window.location.href = "dashboard.html", 700);
  });
});
