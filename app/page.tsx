"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function Home() {

  return (
    <>
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <Header />
      </main>
    </>
  );
}



