import { mockTransactions } from "@/data/mockTransactions";
import { getTotalBalance } from "@/lib/financeLogic";

export default function Home() {
  const balance = getTotalBalance(mockTransactions)
  return (
    <>
    <main className="p-6 m-8">
      <h1 className="text-xl font-bold">Balance: Rs: {balance}</h1>
    </main>
    </>
    
  );
}



