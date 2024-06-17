"use client"


import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser,UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
    const {user,isSignedIn} = useUser();
    return (
        <div className='p-5 px-16 py-3 flex justify-between items-center border shadow-sm'>
            <div className='flex items-center'>
                <Image src={'./logo.svg'} alt='logo' width={50} height={50} />
                <span className='ml-3 text-lg font-semibold'>ExpenseTracker</span>
            </div>
            {isSignedIn ?
            <UserButton/>
            :
            <Link href={'/sign-in'}>
            <Button >Get Started!</Button>
            </Link>}
        </div>

    )
}

export default Header
