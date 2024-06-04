import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import AuthWrapper from './auth_wrapper';
import TanstackProvider from './tanstack_provider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body className={`${inter.className} antialiased`}>
        <AuthWrapper> {/* Wrapping the entire app with AuthWrapper */}
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
