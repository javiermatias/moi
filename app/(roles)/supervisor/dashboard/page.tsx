import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import BitacoraTable from "@/app/ui/supervisor/bitacora-table";
import { DateTime } from "luxon";
import { Suspense } from "react";

export default function Page({
    searchParams,
  }: {
    searchParams?: {     
      page?: string;
    };
  }) {
    const currentPage = Number(searchParams?.page) || 1;

    const now = DateTime.now();
    console.log(now)
    console.log(now.toString())
    console.log(DateTime.now().weekNumber)
    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Bitacoras</h1>
          </div>
        
          <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
            <BitacoraTable currentPage={currentPage} />
          </Suspense>
       {/*    <div className="mt-5 flex w-full justify-center">
    
            <Pagination totalPages={totalPages} />
    
          </div> */}
        </div>
      );
}