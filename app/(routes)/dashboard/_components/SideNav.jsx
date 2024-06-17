"use client";

import React from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget',
      icon: PiggyBank,
      path: '/dashboard/budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='h-screen p-7 border shadow-sm'>
      <div className='flex'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
        </Link>
        <Link href={'/'}>
          <span className='ml-3 text-lg font-semibold cursor-pointer'>ExpenseTracker</span>
        </Link>
      </div>
      <div className='mt-5'>
        {menuList.map((menu) => (
          <Link href={menu.path} >
            <h2 className={`flex gap-3 items-center text-gray-600 font-medium p-2 mb-4 cursor-pointer rounded-md hover:text-black hover:bg-slate-100 ${path === menu.path ? 'text-white bg-black' : ''}`}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 flex gap-3 p-3 items-center'>
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
