import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Effortlessly track your spending, set budgets, and achieve your financial goals with ExpenseTracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Toaster/>
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
