import React from 'react'
import { DataTable } from '../table/data-table'
import { columns } from '../table/column'
import { mockTransactions } from '@/data/mockTransactions'

const TransactionsPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={mockTransactions} />
    </div>
  )
}

export default TransactionsPage