import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import AuthWrapper from './auth_wrapper';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body className={`${inter.className} antialiased`}>
        <AuthWrapper> {/* Wrapping the entire app with AuthWrapper */}
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
