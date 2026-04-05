import { useFinanceStore } from '@/store/useFinanceStore'
import DashboardPage from './DashboardPage'
import TransactionsPage from './TransactionsPage'
import InsightsPage from './InsightsPage'
import SettingsPage from './SettingsPage'

const pages = {
  dashboard: <DashboardPage />,
  transactions: <TransactionsPage />,
  insights: <InsightsPage />,
  settings: <SettingsPage />,
} as const

const MainView = () => {
  const view = useFinanceStore((state) => state.view)

  return (
    <div className='p-5'>
      {pages[view]}
    </div>
  )
}

export default MainView