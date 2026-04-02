"use client";

import { useFinanceStore } from "@/store/useFinanceStore";

export default function Home() {
  const totalBalance = useFinanceStore((state) => state.totalBalance());
  const totalIncome = useFinanceStore((state) => state.totalIncome());
  const totalExpenses = useFinanceStore((state) => state.totalExpenses());
  return (
    <>
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div>Balance: ₹{totalBalance}</div>
      <div>Income: ₹{totalIncome}</div>
      <div>Expenses: ₹{totalExpenses}</div>
    </main>
    </>
    
  );
}



