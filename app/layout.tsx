import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import '../client/src/index.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Luxury Hospitality Toiletries | Premium Hotel Amenities Supplier',
  description: 'Premium supplier of luxury toiletries for hotels and hospitality businesses. Custom branded products with sustainable packaging options.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}