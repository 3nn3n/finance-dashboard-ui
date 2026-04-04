"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function Home() {

  return (
    <>
      <div className="flex h-screen">
        <div>
          <AppSidebar />
        </div>
        <div>
          <Header />
        </div>
        <div></div>
      </div>
    </>

  );
}



