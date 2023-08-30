import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fomo Agenda Cultural',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
