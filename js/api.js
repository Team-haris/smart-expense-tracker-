const api = {
  async getTransactions() {
    return storage.get().transactions;
  },
  async createTransaction(payload) {
    return storage.addTransaction(payload);
  }
};
