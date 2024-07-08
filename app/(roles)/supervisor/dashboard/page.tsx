'use client'
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

export default function Page() {
    

    const now = DateTime.now();
    console.log(now)
    console.log(now.toString())
    console.log(DateTime.now().weekNumber)
    return <p>Supervisor</p>;
}