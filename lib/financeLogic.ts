import { mockTransactions } from "@/data/mockTransactions";

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
      incomeChange: prev.income ? parseFloat((((t.income - prev.income) / prev.income) * 100).toFixed(2)) : 0,
      expenseChange: prev.expenses ? parseFloat((((t.expenses - prev.expenses) / prev.expenses) * 100).toFixed(2)) : 0,
    };
  });
};

export const getHighestSpendingCategory = (transactions: Transaction[]) => {
  const expensesByCategory = getExpensesByCategory(transactions);
  if (expensesByCategory.length === 0) return null;
  return expensesByCategory.reduce((max, category) => category.value > max.value ? category : max);
};

export const spendingLastMonth = (transactions: Transaction[]) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return transactions
    .filter((t) => t.type === "expense" && new Date(t.date) >= lastMonth)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const IncreaseSpendingPercentageMonthly = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  if (trends.length < 2) return 0;
  const lastMonth = trends[trends.length - 1];
  const prevMonth = trends[trends.length - 2];
  return prevMonth.expenses ? parseFloat((((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100).toFixed(2)) : 0;
};

export const IncreaseSpendingMonthly = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  if (trends.length < 2) return 0;
  const lastMonth = trends[trends.length - 1];
  const prevMonth = trends[trends.length - 2];
  return parseFloat((lastMonth.expenses - prevMonth.expenses).toFixed(2));
};

export const getAverageMonthlyExpense = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  if (trends.length === 0) return 0;
  const totalExpense = trends.reduce((sum, t) => sum + t.expenses, 0);
  return parseFloat((totalExpense / trends.length).toFixed(2));
};

export const IncreaseaverageMonthlyExpense = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  if (trends.length < 2) return 0;
  const lastMonthExpense = trends[trends.length - 1].expenses;
  const prevMonthExpense = trends[trends.length - 2].expenses;
  return prevMonthExpense ? parseFloat((((lastMonthExpense - prevMonthExpense) / prevMonthExpense) * 100).toFixed(2)) : 0;
};

export const getSavingsRate = (transactions: Transaction[]) => {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  if (totalIncome === 0) return 0;
  return parseFloat((((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(2));
};

export const monthlySavingIncreasePercentage = (transactions: Transaction[]) => {
  const trends = getMonthlyTrends(transactions);
  if (trends.length < 2) return 0;
  const lastMonthSavings = trends[trends.length - 1].income - trends[trends.length - 1].expenses;
  const prevMonthSavings = trends[trends.length - 2].income - trends[trends.length - 2].expenses;
  return prevMonthSavings ? parseFloat((((lastMonthSavings - prevMonthSavings) / prevMonthSavings) * 100).toFixed(2)) : 0;
};

