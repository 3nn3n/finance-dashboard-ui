import { Home, ArrowLeftRight, ChartColumn, Settings, type LucideIcon } from "lucide-react"

type NavigationItem = {
  label: string
  icon: LucideIcon
}

export const NavigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: Home },
  { label: "Transactions", icon: ArrowLeftRight },
  { label: "Insights", icon: ChartColumn },
  { label: "Settings", icon: Settings },
]

export const Roles: Role[] = ['admin', 'viewer']