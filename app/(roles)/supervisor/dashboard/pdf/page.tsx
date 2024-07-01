
import { type FieldValues, useForm } from 'react-hook-form'
import { createPdf } from './pdfserver';


export default function PDF() {

    const {
       
        handleSubmit,
        formState: { errors },
     
    } = useForm()


    const onSubmit = async (data: FieldValues) => {
        await createPdf();
    }
    return (
        <>

            <div className="w-full container mx-auto py-8">
             
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-md shadow-md">

             


                    <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"
                      
                    >
                        Siguiente
                    </button>

                </form>
            </div>

        </>
    )
}
























/* "use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react"


const InvoicePDF = dynamic(() => import("./pdf"), {
    ssr: false,
  });


const View = () => {

    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return(
        <InvoicePDF/>
    )
}


export default View */