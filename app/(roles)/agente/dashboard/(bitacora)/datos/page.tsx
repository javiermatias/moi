'use client'
import { Bitacora } from '@/app/lib/definitions';
import Spinner from '@/app/ui/spiner'
import Step from '@/app/ui/steps';
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, QueryClient } from '@tanstack/react-query'

import { createBitacora } from '@/app/services/bitacora.service';
import { useBitacoraStore } from '@/app/store/authStore';
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


export default function DatosGenerales() {

    const { data: session } = useSession()
    let user: any = { ...session?.user }
    const queryClient = new QueryClient()
    const { bitacora, setBitacora } = useBitacoraStore()
    console.log(bitacora)
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm()

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const numbStep = Number.parseInt(searchParams.get('id') || '0')
    const mutation = useMutation({
        mutationFn: createBitacora,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['bitacora'] })
        },
    })
    useEffect(() => {

        if (bitacora.asunto) setValue('asunto', bitacora.asunto)
        if (bitacora.nombre) setValue('nombre', bitacora.nombre)
        if (bitacora.lugar) setValue('lugar', bitacora.lugar)
        if (bitacora.convocado) setValue('convocado', bitacora.convocado)

    }, [bitacora, setValue])

    const onSubmit = async (data: FieldValues) => {
        const currentDate = DateTime.local();


        // Set the locale to Spanish
        //fecha formato: const spanishDate = currentDate.setLocale("es").toFormat("dd 'de' MMMM 'de' yyyy");
        //semana: "Dia" + DateTime.now().day + "-S" + DateTime.now().weekNumber,
        //hora: const spanishHour = currentDate.setLocale("es").toFormat("hh:mm a");
        setBitacora({
            ...bitacora,
            asunto: getValues('asunto'),
            nombre: user?.nombre,
            fecha: currentDate.toString(),
            lugar: getValues('lugar'),
            convocado: getValues('convocado'),
            id_user: Number.parseInt(user?.id || '0')
        })

        /*       const bitacora: Bitacora = {
      
                  asunto: getValues('asunto'),
                  nombre: user?.nombre,
                  fecha: currentDate.toString(),
                  lugar: getValues('lugar'),
                  convocado: getValues('convocado'),
                  id_user: Number.parseInt(user?.id || '0'), // Your id usuario value
              };
              console.log(bitacora);
              await mutation.mutateAsync(bitacora) */
        router.push('/agente/dashboard/despacho?id=1')
    }
    return (
        <>

            <div className="container mx-auto py-8">
                <Step id={numbStep}></Step>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">Datos Generales</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

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

                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">Datos Despacho</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="despacho">
                                    ID despacho
                                </label>
                                <input
                                    {...register('despacho', {
                                        required: 'El el id de despacho es requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="despacho"
                                    name="despacho"
                                    placeholder="101...."
                                />
                                {(errors.despacho != null) && (

                                    <p className="text-red-500">{`${errors.despacho.message}`}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre Despacho
                                </label>
                                <input
                                    {...register('nombre', {
                                        required: 'El nombe de despacho requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="ON..."
                                />
                                {(errors.nombre != null) && (

                                    <p className="text-red-500">{`${errors.nombre.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="atiende">
                                    Nombre de quien atiende
                                </label>
                                <input
                                    {...register('atiende', {
                                        required: 'Nombre de quien atiende es requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="atiende"
                                    name="atiende"
                                    placeholder="Yessica..."
                                />
                                {(errors.atiende != null) && (

                                    <p className="text-red-500">{`${errors.atiende.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cargo">
                                    Cargo de quien atiende
                                </label>
                                <input
                                    {...register('cargo', {
                                        required: 'Cargo de quien atiende es requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="cargo"
                                    name="cargo"
                                    placeholder="Yessica..."
                                />
                                {(errors.cargo != null) && (

                                    <p className="text-red-500">{`${errors.cargo.message}`}</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        Siguiente
                    </button>

                </form>
            </div>

        </>
    )
}