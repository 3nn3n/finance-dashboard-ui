declare global {

type TransactionType = 'income' | 'expense';

type Role = 'admin' | 'viewer';

type Category =
  | 'Food'
  | 'Rent'
  | 'Salary'
  | 'Entertainment'
  | 'Transport'
  | 'Utilities'
  | 'Freelance'
  | 'Shopping'
  | 'Health'
  | 'Others';

type Transaction = {
  id: string;
  date: string; // This thing should be an ISO string
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}
}

export {};