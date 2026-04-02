
import { create } from "zustand";
import { mockTransactions } from "@/data/mockTransactions";
import {
  getTotalIncome,
  getTotalExpenses,
  getTotalBalance,
} from "@/lib/financeLogic";

type Filters = {
  category?: Category | "All";
  type?: TransactionType | "All";
  search?: string;
  startDate?: string;
  endDate?: string;
};

type Theme = "light" | "dark";

type FinanceStore = {
  // STATE
  transactions: Transaction[];
  filters: Filters;
  role: Role;
  theme: Theme;

  // ACTIONS
  addTransaction: (t: Transaction) => void;
  editTransaction: (id: string, updated: Partial<Transaction>) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setRole: (role: Role) => void;
  setTheme: (theme: Theme) => void;

  // DERIVED
  filteredTransactions: () => Transaction[];
  totalIncome: () => number;
  totalExpenses: () => number;
  totalBalance: () => number;
};

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  // ---------------- STATE ----------------
  transactions: mockTransactions,
  filters: {
    category: "All",
    type: "All",
    search: "",
  },
  role: "admin",
  theme: "light",

  // ---------------- ACTIONS ----------------
  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),

  editTransaction: (id, updated) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      ),
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setRole: (role) => set({ role }),

  setTheme: (theme) => set({ theme }),

  // ---------------- DERIVED ----------------

  filteredTransactions: () => {
    const { transactions, filters } = get();

    return transactions.filter((t) => {
      const matchCategory =
        filters.category === "All" || t.category === filters.category;

      const matchType =
        filters.type === "All" || t.type === filters.type;

      const matchSearch =
        !filters.search ||
        t.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchStartDate =
        !filters.startDate || t.date >= filters.startDate;

      const matchEndDate =
        !filters.endDate || t.date <= filters.endDate;

      return (
        matchCategory &&
        matchType &&
        matchSearch &&
        matchStartDate &&
        matchEndDate
      );
    });
  },

  totalIncome: () => {
    const { transactions } = get();
    return getTotalIncome(transactions);
  },

  totalExpenses: () => {
    const { transactions } = get();
    return getTotalExpenses(transactions);
  },

  totalBalance: () => {
    const { transactions } = get();
    return getTotalBalance(transactions);
  },
}));