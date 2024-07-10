'use client'
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import BitacoraTable from "@/app/ui/supervisor/bitacora-table";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import Link from "next/link";
import { Suspense } from "react";

export default function Page({
    searchParams,
  }: {
    searchParams?: {     
      id?: string;
    };
  }) {
    const currentPage = Number(searchParams?.id) || 1;
    const { isPending, error, data,isSuccess } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch(`/api/detail?id=${currentPage}`).then((res) =>
            res.json(),
          ),
      })

    if(isSuccess){

        console.table(data);
    }

    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Bitacoras</h1>
          </div>
        
          <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
            <BitacoraTable currentPage={currentPage} />
          </Suspense>
      <div className="mt-5 flex w-full justify-center space-x-4">
    
      {currentPage > 1 && (
      <Link
        href={`/supervisor/dashboard?page=${currentPage - 1}`}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >       
        Atras
      </Link>
    )}
    <Link
      href={`/supervisor/dashboard?page=${currentPage + 1}`}
      className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
    >
      Siguiente
    </Link>
    
          </div> 
        </div>
      );
}