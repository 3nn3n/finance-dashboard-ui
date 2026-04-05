import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { ArrowUp, BanknoteArrowDown, BanknoteArrowUp, HandCoins, IndianRupee, ShieldCheck } from 'lucide-react'
import { getTotalBalance, getTotalExpenses, getTotalIncome, monthlyChangePercentage } from '@/lib/financeLogic'
import { mockTransactions } from '@/data/mockTransactions'
import { formatINR } from '@/lib/utils'
import { ChartAreaDefault } from '../charts/AreaChart'
import { ChartPieDonutActive } from '../charts/PieChartDonut'

const DashboardPage = () => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-5'>
        <div>
          <Card className='flex items-start gap-0 bg-green-700/10'>
            <div className='flex items-center gap-2 mx-5'>
              <div><HandCoins className='text-blue-500' /></div>
              <div>
                <h1 className='text-gray-500'>Savings</h1>
              </div>
            </div>
            <div className='text-4xl font-bold flex items-center gap-1 mx-5 mt-2'>
              <IndianRupee className='text-blue-500' />
              <span>{formatINR(getTotalBalance(mockTransactions))}</span>
            </div>
            <div className='flex items-center gap-1 mx-5 text-green-500'>
              <span><ArrowUp className='text-green-500' /></span>
              <p>vs last month</p>
            </div>
          </Card>
        </div>
        <div>
          <Card className='flex items-start justify-between gap-0 bg-green-700/10'>
            <div className='flex items-center gap-2 mx-5'>
              <div><BanknoteArrowUp className='text-green-500' /></div>
              <div>
                <h1 className='text-gray-500'>Income</h1>
              </div>
            </div>
            <div className='text-4xl font-bold flex items-center gap-1 mx-5 mt-2'>
              <IndianRupee className='text-green-500' />
              <span>{formatINR(getTotalIncome(mockTransactions))}</span>
            </div>
            <div className='flex items-center gap-1 mx-5 text-green-500 '>
              <span><ArrowUp className='text-green-500' /></span>
              <p>vs last month</p>
            </div>
          </Card>
        </div>
        <div>
          <Card className='flex items-start justify-between gap-0 bg-red-700/10'>
            <div className='flex items-center gap-2 mx-5'>
              <div><BanknoteArrowDown className='text-red-500' /></div>
              <div>
                <h1 className='text-gray-500'>Expenses</h1>
              </div>
            </div>
            <div className='text-4xl font-bold flex items-center gap-1 mx-5 mt-2'>
              <IndianRupee className='text-red-500' />
              <span>{formatINR(getTotalExpenses(mockTransactions))}</span>
            </div>
            <div className='flex items-center gap-1 mx-5 text-red-500'>
              <span><ArrowUp className='text-red-500' /></span>
              <p>vs last month</p>
            </div>
          </Card>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        <div>
          <ChartAreaDefault />
        </div>
        <div>
          <ChartPieDonutActive />
        </div>
      </div>
      <div className='flex mt-5 w-full items-center justify-center'>
        <Card className='flex flex-col items-center w-full justify-center'>
          <div><ShieldCheck className='text-green-500' /></div>
          <div>
            <h1>You're doing great!</h1>
          </div>
        </Card>
      </div>
    </div>
)
}

export default DashboardPage