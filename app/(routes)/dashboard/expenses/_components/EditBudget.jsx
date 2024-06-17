"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { useEffect } from 'react'

function EditBudget({budgetInfo,refreshdata}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { user } = useUser();

    useEffect(() => {
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon);
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount);
        }
    
    }, [budgetInfo])

    const onUpdateBudget = async () => {
        const result = await db.update(Budget).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budget.id, budgetInfo.id))
        .returning();

        if(result){
            refreshdata();
            toast.success('Budget is Updated');
        }
    }
  return (
    <div>
       
       <Dialog>
                <DialogTrigger asChild>
                <Button className='flex gap-2'> <PenBox/> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-3'>
                                <Button
                                    variant='outline'
                                    size='lg'
                                    className='text-lg'
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div className='absolute z-20'>
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black my-1 font-medium'>Budget Name</h2>
                                    <Input
                                        placeholder="e.g. Home Decor"
                                        className="text-black"
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black my-1 font-medium'>Budget Amount</h2>
                                    <Input
                                        placeholder="e.g. 500"
                                        className="text-black"
                                        type='number'
                                        defaultValue={budgetInfo?.amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
        
                                    <Button
                                        disabled={!name || !amount}
                                        className='mt-5 w-full'
                                        onClick={onUpdateBudget}
                                    >
                                        Update Budget
                                    </Button>
                            
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default EditBudget
