import React from 'react'
import { Button } from '../ui/button'
import { Bell, SearchIcon, User } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { useFinanceStore } from '@/store/useFinanceStore'

const Header = () => {
  const view = useFinanceStore((state) => state.view)

  const pageTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights',
    settings: 'Settings',
  } as const

  const pageSubtitles = {
  dashboard: "Welcome Back, Here's your financial overview",
  transactions: 'Track and manage all your financial transactions',
  insights: 'Analyze your spending patterns and financial trends',
  settings: 'Manage your account preferences and settings',
} as const

  return (
    <div className='flex items-center justify-between w-full p-5 border-b'>
      <div className='flex-1 min-w-0'>
        <h1 className='text-2xl font-bold'>{pageTitles[view]}</h1>
        <h3 className='text-sm text-gray-400 line-clamp-1'>{pageSubtitles[view]}</h3>
      </div>
      <div className='flex shrink-0 items-center gap-5'>
        <div>
          <InputGroup>
            <InputGroupInput placeholder="Search..."/>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div><Button variant={'outline'}><Bell /></Button></div>
        <div><Button variant={'outline'}><User  /></Button></div>
      </div>
    </div>
  )
}

export default Header