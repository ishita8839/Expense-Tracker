"use client"

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"

function CreateBudget({refreshdata}) {
    const [emojiIcon, setEmojiIcon] = useState('😃');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { user } = useUser();

    const onCreateBudget = async () => {
        if (!user) {
            toast.error("User not authenticated");
            return;
        }
        try {
            const result = await db.insert(Budget)
                .values({
                    name: name,
                    amount: parseFloat(amount),
                    createdBy: user.primaryEmailAddress.emailAddress,
                    icon: emojiIcon
                }).returning({ insertedId: Budget.id });

            if (result.length > 0) {
                refreshdata();
                toast.success('New Budget Created');
            }
        } catch (error) {
            toast.error("Failed to create budget");
            console.error("Error creating budget:", error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 items-center flex flex-col rounded-lg border-1 border-dashed hover:shadow-md '>
                        <h2 className='text-3xl px-3 cursor-pointer hover:rounded-2xl hover:bg-slate-200 '>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Budget</DialogTitle>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black my-1 font-medium'>Budget Amount</h2>
                                    <Input
                                        placeholder="e.g. 500"
                                        className="text-black"
                                        type='number'
                                        value={amount}
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
                                        onClick={onCreateBudget}
                                    >
                                        Create Budget
                                    </Button>
                            
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateBudget;
