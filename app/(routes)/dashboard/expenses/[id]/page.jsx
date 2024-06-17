"use client"

import { db } from '@/utils/dbConfig';
import { Budget, Expenses } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getTableColumns, eq, sql } from 'drizzle-orm';
import BudgetItem from '../../budget/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import { desc } from 'drizzle-orm';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';


function ExpensesComponent({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user && params.id) {
      getBudgetInfo();

    }
  }, [user, params.id]);

  const getBudgetInfo = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budget),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
        .from(Budget)
        .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
        .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budget.id, params.id))
        .groupBy(Budget.id);
      setBudgetInfo(result[0]);
      getExpensesList();

    } catch (error) {
      console.error('Error fetching budget info:', error);
    }
  };

  const getExpensesList = async () => {
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result)
  }

  const deleteBudget = async ()=> {
    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning();

    if(deleteExpenseResult){
      const result = await db.delete(Budget)
    .where(eq(Budget.id, params.id))
    .returning();
    }
    toast.success('Budget Deleted Successfully');
    router.replace("/dashboard/budget")
    
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses 
       <div className='flex gap-2 items-center'>
        <EditBudget budgetInfo={budgetInfo} refreshdata={()=>getBudgetInfo()}/>
        <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button className='flex gap-2' ><Trash /> Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current budget along with your expenses
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction  onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div> 

      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem
          budget={budgetInfo}
        /> :
          <div className='h-[140px] w-full bg-slate-200 rounded-lg animate-pulse'>

          </div>
        }
        <AddExpense budgetId={params.id} user={user} refreshdata={() => getBudgetInfo()} />
      </div>
      <div className='mt-3'>
        <ExpenseListTable expensesList={expensesList} refreshdata={() => getBudgetInfo()} />
      </div>
    </div>
  );
}

export default ExpensesComponent;
