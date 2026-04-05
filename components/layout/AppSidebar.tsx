"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { NavigationItems, Roles } from "@/lib/constants"
import { useFinanceStore } from "@/store/useFinanceStore"
import { ChevronDown, MessageCircleQuestionMark, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function AppSidebar() {
  const role = useFinanceStore((state) => state.role)
  const setRole = useFinanceStore((state) => state.setRole)
  const view = useFinanceStore((state) => state.view)
  const setView = useFinanceStore((state) => state.setView)

  const labelToView = {
    Dashboard: "dashboard",
    Transactions: "transactions",
    Insights: "insights",
    Settings: "settings",
  } as const

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center m-5 ">
        <Image src="/zorvyn-logo.png" alt="Logo" width={150} height={150} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NavigationItems.map((item) => {
              const Icon = item.icon
              const currentView = labelToView[item.label as keyof typeof labelToView]
              const isActive = currentView === view

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      onClick={() => setView(currentView)}
                      className={`flex items-center text-xl mt-2 gap-5 p-5 cursor-pointer rounded-md ${
                        isActive
                          ? "bg-gray-200 dark:bg-gray-700"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span>
                        <Icon className="size-4" />
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="mt-5" />
        <div className=" flex items-center justify-between">
          <h2 className="px-7 mt-2 text-400">Role</h2>
          <SidebarGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-25 h-8 mt-1 text-sm justify-between">
                  {role === "admin" ? "Admin" : "Viewer"} <ChevronDown className="size-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className="flex flex-col items-center">
                  {Roles.map((value) => (
                    <DropdownMenuItem key={value} onClick={() => setRole(value)} className="w-full text-center text-md justify-center">
                      {value === "admin" ? "Admin" : "Viewer"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroup>
        </div>
        <SidebarGroup>
          <div className='mx-2 text-lg flex items-center justify-between'>
            {mounted && theme === "light" ? (
              <Button variant="ghost" onClick={() => setTheme("dark")}>Mode<Sun className="ml-25" /></Button>
            ) : (
              <Button variant="ghost" onClick={() => setTheme("light")}>Mode<Moon className="ml-25" /></Button>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"ghost"} className="mb-5 text-400"><MessageCircleQuestionMark /> Help and Support</Button>
      </SidebarFooter>
    </Sidebar>
  )
}