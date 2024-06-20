"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

function Hero() {
    const { user } = useUser();
    const router = useRouter();
    const goToDashboard = () => {
        if(user){
        router.replace('/dashboard')
        }else{
            router.replace('/sign-in')
        }
    }

    const goToSignIn =() =>{
        router.replace('/sign-in')
    }
    return (
        <section className="bg-white flex flex-col items-center justify-center w-full h-full">
            <div className="mx-auto max-w-screen-xl px-4 py-28  ">
                <div className='items-center justify-center flex mb-3'>
                <span
                    className="inline-flex items-center justify-center rounded-full bg-black/10 px-2.5 py-0.5  text-black  "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="whitespace-nowrap text-sm">Record your budget and spendings</p>
                </span>
                </div>

                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage your Expense
                        <strong className="font-extrabold text-black sm:block"> Control your money </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start creating yout own budget and save a ton of money.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        
                        <Button className="hover:text-gray-100" onClick={() => goToSignIn()}>Get Started now</Button>
                        
                       
                        <Button variant="outline" className="shadow-lg" onClick={()=>goToDashboard()}>Go to Dashboard</Button>
                     
                    </div>
                </div>
            </div>
            <div>
                <Image src={'/dashboard.png'} alt='dashboard' width={1000} height={500}
                className='mt-5 rounded-xl border-2' />
            </div>
        </section>
    )
}

export default Hero
