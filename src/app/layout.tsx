import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import RegisterModal from '../components/modals/RegisterModal';
import ToasterProvider from '@/components/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from '@/actions/getCurrentUser';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';

// const inter = Inter({ subsets: ['latin'] });
const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'airBnb',
  description: 'airBnb clone using nextjs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <ToasterProvider />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
