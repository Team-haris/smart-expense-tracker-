const seedData = {
  user: {
    name: "Ansari Abdul Haris",
    email: "haris@example.com",
    phone: "+91 98765 43210"
  },
  transactions: [
    { id: 1, type: "income", title: "Salary", category: "Salary", amount: 68000, date: "2026-06-01", method: "Bank" },
    { id: 2, type: "expense", title: "Apartment Rent", category: "Rent", amount: 18000, date: "2026-06-02", method: "UPI" },
    { id: 3, type: "expense", title: "Metro Pass", category: "Travel", amount: 1600, date: "2026-06-05", method: "Card" },
    { id: 4, type: "expense", title: "Groceries", category: "Food", amount: 5200, date: "2026-06-10", method: "UPI" },
    { id: 5, type: "income", title: "Freelance UI Work", category: "Freelancing", amount: 14000, date: "2026-06-12", method: "Bank" },
    { id: 6, type: "expense", title: "Course Subscription", category: "Education", amount: 2200, date: "2026-06-18", method: "Card" },
    { id: 7, type: "expense", title: "Movie Night", category: "Entertainment", amount: 1100, date: "2026-06-22", method: "UPI" }
  ],
  budgets: [
    { category: "Food", limit: 9000, spent: 5200 },
    { category: "Travel", limit: 3500, spent: 1600 },
    { category: "Education", limit: 5000, spent: 2200 },
    { category: "Entertainment", limit: 2500, spent: 1100 }
  ],
  goals: [
    { name: "Emergency Fund", target: 120000, saved: 76000 },
    { name: "New Laptop", target: 90000, saved: 42000 },
    { name: "Vacation", target: 60000, saved: 18000 }
  ]
};

const storage = {
  key: "smartExpenseData",
  get() {
    const raw = localStorage.getItem(this.key);
    if (!raw) {
      localStorage.setItem(this.key, JSON.stringify(seedData));
      return structuredClone(seedData);
    }
    return JSON.parse(raw);
  },
  set(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  addTransaction(transaction) {
    const data = this.get();
    data.transactions.unshift({
      id: Date.now(),
      ...transaction,
      amount: Number(transaction.amount)
    });
    this.set(data);
    return data;
  },
  updateUser(user) {
    const data = this.get();
    data.user = { ...data.user, ...user };
    this.set(data);
    return data.user;
  }
};
