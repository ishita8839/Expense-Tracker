"use client"

import React from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { useEffect, useState } from 'react';
import { Expenses,Budget } from '@/utils/schema';
import { eq,desc } from 'drizzle-orm';

function ExpenseList() {

    const { user } = useUser();
    const [expensesList, setExpensesList] = useState([]);
    useEffect(() => {
        user && getAllExpenses();
      }, [user])
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
    <div className='p-10'>
      <h2 className='text-3xl font-bold '>My Expenses</h2>
      {expensesList.length > 0 && (
            <ExpenseListTable
              expensesList={expensesList}
              refreshdata={getAllExpenses()}
            />
          )}

    </div>
  )
}

export default ExpenseList
