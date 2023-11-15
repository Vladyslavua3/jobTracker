import './globals.css'
import React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs";
import {ToasterProvider} from "@/providers/toast-provider";
import {ModalProvider} from "@/providers/modal-provider";
import ThemeProviders from "@/providers/theme-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
            <ThemeProviders>
            <ToasterProvider/>
            <ModalProvider/>
            {children}
            </ThemeProviders>
            </body>
            </html>
        </ClerkProvider>
    )
}
