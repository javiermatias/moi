import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import Main from './ui/main';

export default function Page({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Main></Main>
    </>
  );
}
