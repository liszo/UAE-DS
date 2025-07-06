import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
 subsets: ['latin'],
 variable: '--font-inter'
});

export const metadata: Metadata = {
 title: 'UAE Digital - Digital Solutions Agency',
 description: 'Transform your business with cutting-edge digital solutions',
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" suppressHydrationWarning={true} className={inter.variable}>
 <body suppressHydrationWarning={true}>
 <Header />
 <main>{children}</main>
 <Footer />
 <ChatWidget />
 </body>
 </html>
 );
}