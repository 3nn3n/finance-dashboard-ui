
// Use it for getting total income
export const getTotalIncome = (transactions: Transaction[]) => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Use it for total expenses
export const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Use it for getting total balance
export const getTotalBalance = (transactions: Transaction[]) => {
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  return income - expenses;
};

// Group expenses by category (for pie chart)
export const getExpensesByCategory = (transactions: Transaction[]) => {
  const result: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      result[t.category] = (result[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(result).map(([category, value]) => ({
    category,
    value,
  }));
};