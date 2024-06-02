'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  console.log('Client Side Rendering')
  const { data: session } = useSession() // useSession()

  useEffect(() => {
    console.log(session); // console.log
  }, [session])


  return <p>Customers</p>;
}