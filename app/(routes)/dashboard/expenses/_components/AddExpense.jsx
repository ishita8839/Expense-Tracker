import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment/moment';
import { Loader } from 'lucide-react';
function AddExpense({ budgetId, user, refreshdata }) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: moment().format('DD/MM/YYYY')
            }).execute();

            console.log(result);
            setName('');
            setAmount('');
            if (result) {
                setLoading(false);
                refreshdata();
                toast.success("New expense added");
            }
            setLoading(false);
        } catch (error) {
            console.error('Error adding expense:', error);
            toast.error("Failed to add expense");
        }
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black my-1 font-medium'>Expense Name</h2>
                <Input
                    placeholder="e.g. Bedroom Decor"
                    className="text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black my-1 font-medium'>Expense Amount</h2>
                <Input
                    placeholder="e.g. 1000"
                    className="text-black"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading}
                onClick={addNewExpense}
                className='mt-3 w-full'
            >
                {loading ?
                    <Loader className='animate-spin' /> : "Add new Expense"
                }

            </Button>
        </div>
    )
}

export default AddExpense;
