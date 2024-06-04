'use client'
import { Bitacora } from '@/app/lib/definitions';
import Spinner from '@/app/ui/spiner'
import Step from '@/app/ui/steps';
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, QueryClient } from '@tanstack/react-query'

import { createBitacora } from '@/app/services/bitacora.service';
/* export type Bitacora = {
  semana: string;
  asunto: string;
  nombre: string; //nombreColaborador
  fecha: string;
  lugar: string;
  hora: string;
  convocado: string;//convocadoPor
  id_user: number; //id usuario

}*/


export default function Despacho() {
    /*   console.log('Client Side Rendering')
  const { data: session } = useSession() // useSession()
 
  useEffect(() => {
    console.log(session); // console.log
  }, [session]) */
    const { data: session } = useSession()
    let user: any = { ...session?.user }
    const queryClient = new QueryClient()
    //const currentDate = DateTime.local();
    //console.log(currentDate.toString())
    //console.log(session?.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm()

    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const numbStep = Number.parseInt(searchParams.get('id') || '0')
    const mutation = useMutation({
        mutationFn: createBitacora,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['bitacora'] })
        },
    })

    const onSubmit = async (data: FieldValues) => {
        const currentDate = DateTime.local();


        // Set the locale to Spanish
        //fecha formato: const spanishDate = currentDate.setLocale("es").toFormat("dd 'de' MMMM 'de' yyyy");
        //semana: "Dia" + DateTime.now().day + "-S" + DateTime.now().weekNumber,
        //hora: const spanishHour = currentDate.setLocale("es").toFormat("hh:mm a");

        const bitacora: Bitacora = {

            asunto: getValues('asunto'),
            nombre: user?.nombre,
            fecha: currentDate.toString(),
            lugar: getValues('lugar'),
            convocado: getValues('convocado'),
            id_user: Number.parseInt(user?.id || '0'), // Your id usuario value
        };
        console.log(bitacora);
        mutation.mutate(bitacora)


    }
    return (
        <>

            <div className="container mx-auto py-8">
                <Step id={numbStep}></Step>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="asunto">
                                Asunto
                            </label>
                            <input
                                {...register('asunto', {
                                    required: 'El asunto es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="asunto"
                                name="asunto"
                                placeholder="Reunion de proyecto..."
                            />
                            {(errors.asunto != null) && (

                                <p className="text-red-500">{`${errors.asunto.message}`}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lugar">
                                Lugar
                            </label>
                            <input
                                {...register('lugar', {
                                    required: 'El lugar es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="lugar"
                                name="lugar"
                                placeholder="Sala de..."
                            />
                            {(errors.lugar != null) && (

                                <p className="text-red-500">{`${errors.lugar.message}`}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="convocado">
                                Convocado por
                            </label>
                            <input
                                {...register('convocado', {
                                    required: 'Convocado por es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="convocado"
                                name="convocado"
                                placeholder="Juan..."
                            />
                            {(errors.convocado != null) && (

                                <p className="text-red-500">{`${errors.convocado.message}`}</p>
                            )}
                        </div>

                    </div>

                    <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Siguiente'}
                    </button>

                </form>
            </div>

        </>
    )
}