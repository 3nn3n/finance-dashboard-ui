
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

export const getMonthlyTrends = (transactions: Transaction[]) => {
  const result: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
    if (!result[month]) {
      result[month] = { income: 0, expenses: 0 };
    }
    if (t.type === "income") {
      result[month].income += t.amount;
    } else if (t.type === "expense") {
      result[month].expenses += t.amount;
    }
  });

  return Object.entries(result).map(([month, values]) => ({
    month,
    ...values,
  }));
};


export const monthlyChangePercentage = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  return trends.map((t, i) => {
    if (i === 0) return { ...t, incomeChange: 0, expenseChange: 0 };
    const prev = trends[i - 1];
    return {
      ...t,
      incomeChange: prev.income ? ((t.income - prev.income) / prev.income) * 100 : 0,
      expenseChange: prev.expenses ? ((t.expenses - prev.expenses) / prev.expenses) * 100 : 0,
    };
  });
};

