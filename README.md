# Personal Finance Dashboard

A sleek and intuitive personal finance dashboard built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Track your income, expenses, and financial insights all in one place.

## Features

- **Dashboard** — Overview of savings, income, and expenses with area and pie charts
- **Transactions** — Filterable, searchable transaction table with add/edit support
- **Insights** — Spending radar, savings rate, highest category spend, and monthly trends
- **Settings** — Dark/light theme toggle, role switcher (admin/viewer), and profile info
- **Role-Based Access** — Admin (full access) and Viewer (read-only) roles
- **Responsive Sidebar** — Collapsible navigation with mobile support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Charts | Recharts |
| State Management | Zustand |
| Table | TanStack React Table |
| Theming | next-themes |

## Project Structure

```
zorvyn/
├── app/                  # Next.js app router (layout, page, globals.css)
├── components/
│   ├── charts/           # AreaChart, PieChartDonut, RadialLineChart
│   ├── layout/           # DashboardPage, TransactionsPage, InsightsPage, SettingsPage, Header, Sidebar, MainView
│   ├── provider/         # ThemeProvider (next-themes)
│   ├── table/            # Column definitions, DataTable
│   └── ui/               # shadcn/ui primitives (Button, Card, Dialog, Select, Switch, etc.)
├── data/                 # Mock transactions
├── hooks/                # Custom hooks (use-mobile)
├── lib/                  # Utility functions, finance logic, constants
├── store/                # Zustand store (useFinanceStore)
└── types/                # Global TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## State Management

All app state lives in a single Zustand store (`useFinanceStore`):

- **transactions** — list of all transactions
- **filters** — category, type, search, date range
- **role** — `admin` | `viewer`
- **theme** — `light` | `dark`
- **view** — current active page

Derived selectors compute filtered transactions, totals, and balances on the fly.

