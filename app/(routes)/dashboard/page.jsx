"use client"

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { useUser } from '@clerk/nextjs';
import CardsInfo from './_components/CardsInfo';
import { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budget,Expenses } from '@/utils/schema';
import BarChartComponents from './_components/BarChartComponents';
import BudgetItem from './budget/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    user && getBudgetList();
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budget),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budget)
      .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
      .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budget.id)
      .orderBy(desc(Budget.id));
    setBudgetList(result);
    getAllExpenses();
  }

  const getAllExpenses = async() => {
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budget)
    .rightJoin(Expenses,eq(Budget.id,Expenses.budgetId))
    .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  }




  return (
    <div className='p-8'>
      <h2 className='font-bold text-2xl'>Hi, {user?.fullName} ✌</h2>
      <p className='text-gray-500'>Here's what happening with yur money , Lets Manage your expense</p>
      <CardsInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          {budgetList.length > 0 && <BarChartComponents budgetList={budgetList} />}
  
          {expensesList.length > 0 && (
            <ExpenseListTable
              expensesList={expensesList}
              refreshdata={getBudgetList()}
            />
          )}
        </div>
  
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.length > 0 &&
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
