import React from 'react'
import { Card } from '../ui/card'
import { CalendarRangeIcon, Film, IndianRupee, Lightbulb, PiggyBank, Pizza, ShoppingCart, Wallet } from 'lucide-react'
import { getAverageMonthlyExpense, getExpensesByCategory, getHighestSpendingCategory, getSavingsRate, IncreaseaverageMonthlyExpense, IncreaseSpendingMonthly, IncreaseSpendingPercentageMonthly, monthlySavingIncreasePercentage, spendingLastMonth } from '@/lib/financeLogic'
import { mockTransactions } from '@/data/mockTransactions'
import { ChartRadarLinesOnly } from '../charts/RadialLineChart'

const InsightsPage = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div>
          <Card>
            <div className="flex px-4 space-x-4">
              <div className='pt-1'><IndianRupee className='text-green-600 bg-green-200 border rounded-md p-1' /></div>
              <div className='flex flex-col'>
                <div><h3 className='text-gray-500 text-sm'>Highest Spending</h3></div>
                <div className='mt-2'><h1 className='text-3xl font-semibold'>{getHighestSpendingCategory(mockTransactions)?.category}</h1></div>
                <div><h1 className='text-sm text-red-400 font-sm'>₹ {getHighestSpendingCategory(mockTransactions)?.value}</h1></div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <div className="flex px-4 space-x-4">
              <div className='pt-1'><ShoppingCart className='text-green-600 bg-green-200 border rounded-md p-1' /></div>
              <div className='flex flex-col'>
                <div><h3 className='text-gray-500 text-sm'>Spending Last Month</h3></div>
                <div className='mt-2'><h1 className='text-3xl font-semibold'>{IncreaseSpendingPercentageMonthly(mockTransactions)}%</h1></div>
                <div><h1 className='text-sm text-red-400 font-sm'>Spent ₹ {IncreaseSpendingMonthly(mockTransactions)} more</h1></div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <div className="flex px-4 space-x-4">
              <div className='pt-1'><PiggyBank className='text-green-600 bg-green-200 border rounded-md p-1' /></div>
              <div className='flex flex-col'>
                <div><h3 className='text-gray-500 text-sm'>Savings Rate</h3></div>
                <div className='mt-2'><h1 className='text-3xl font-semibold'>{getSavingsRate(mockTransactions)}%</h1></div>
                <div><h1 className='text-sm text-red-400 font-sm'>{monthlySavingIncreasePercentage(mockTransactions)}% vs last month</h1></div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <div className="flex px-4 space-x-4">
              <div className='pt-1'><CalendarRangeIcon className='text-green-600 bg-green-200 border rounded-md p-1' /></div>
              <div className='flex flex-col'>
                <div><h3 className='text-gray-500 text-sm'>Avg. Monthly Expense</h3></div>
                <div className='mt-2'><h1 className='text-3xl font-semibold'>₹ {getAverageMonthlyExpense(mockTransactions)}</h1></div>
                <div><h1 className='text-sm text-red-400 font-sm'>{IncreaseaverageMonthlyExpense(mockTransactions)}% vs last month </h1></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartRadarLinesOnly transactions={mockTransactions} />
          <div>
            <Card className='h-full gap-0'>
              <h1 className='text-lg font-medium px-5'>Top Insights</h1>
              <div className='p-5 space-y-4 flex items-center gap-3'>
                <Pizza className='text-purple-500' />
                You spent ₹ {getExpensesByCategory(mockTransactions).find(category => category.category === 'Food')?.value} on food.
              </div>
              <div className='p-5 flex items-center gap-3'>
                <PiggyBank className='text-yellow-500' />
                Your Savings rate are higher than 73% of users.
              </div>
              <div className='p-5 flex items-center gap-3'>
                <Wallet className='text-pink-500' />
                Your average monthly expense increased by 12% compared to last month.
              </div>
              <div className='p-5 flex items-center gap-3'>
                <Film className='text-blue-500' />
                Your spending on entertainment category increased by 20% compared to last month.
              </div>
              <div className='p-5 flex items-center gap-3'>
                <ShoppingCart className='text-orange-500' />
                Your spending on shopping category decreased by 15% compared to last month.
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div >
        <Card className='mt-4'>
          <div className='p-5 space-y-4 flex items-center gap-3'>
            <div>
              <Lightbulb className='text-yellow-500 text-3xl h-10 w-10' />
            </div>
            <div>
            <div>
              <h1 className='text-lg font-medium'>Smart Tip</h1>
            </div>
            <div>
              <p className='text-sm text-green-600'>Based on your spending patterns, consider setting a monthly budget for the food category to manage your expenses better.</p>
            </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default InsightsPage