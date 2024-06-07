'use client'
import { Bitacora, Participante } from '@/app/lib/definitions';
import Spinner from '@/app/ui/spiner'
import Step from '@/app/ui/steps';
import { DateTime } from 'luxon';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, QueryClient } from '@tanstack/react-query'

import { createBitacora } from '@/app/services/bitacora.service';
import { useBitacoraStore } from '@/app/store/authStore';
import Badge from '@/app/ui/badge';
/* export type Bitacora = {
  //semana: string;
  asunto: string;
  nombre: string; //nombreColaborador
  fecha: string;
  lugar: string;
  convocado: string;//convocadoPor
  id_user: number; //id usuario
  id_despacho: string; //id despacho
  nombre_despacho: string; //nombre despacho
  nombre_atiende: string; //nombre atiende
  cargo_atiende: string; //cargo de quein atiende

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
    const { bitacora, setBitacora } = useBitacoraStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm()

    const [loading, setLoading] = useState(false)
    const [hallazgo, setHallazgo] = useState(new Array<string>())
    const searchParams = useSearchParams()
    const numbStep = Number.parseInt(searchParams.get('id') || '0')
    const mutation = useMutation({
        mutationFn: createBitacora,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['bitacora'] })
        },
    })


    const agregarHallazago = () => {
        const newHallazgo = getValues('hallazgo');

        setHallazgo([...hallazgo, newHallazgo])

    }

    const onRemove = (name: string) => {
        // Filter out the badge with the specified id
        const updatedParticipante = hallazgo.filter(badge => badge !== name)

        // Update the state with the filtered badges array
        setHallazgo(updatedParticipante)

        // console.log("Se borró el número con id " + id);
    }
    const onSubmit = async (data: FieldValues) => {
        const currentDate = DateTime.local();


        // Set the locale to Spanish
        //fecha formato: const spanishDate = currentDate.setLocale("es").toFormat("dd 'de' MMMM 'de' yyyy");
        //semana: "Dia" + DateTime.now().day + "-S" + DateTime.now().weekNumber,
        //hora: const spanishHour = currentDate.setLocale("es").toFormat("hh:mm a");

        /* 
             deudores: '',
              llamada: '',
              blaster: '',
              sms: '',
              whatsapp: '',
              carta: '',
              visita: '',
              otro: ''
   */

        const new_bitacora: Bitacora = {
            ...bitacora,
            deudores: getValues('deudores'),
            llamada: getValues('llamada'),
            blaster: getValues('blaster'),
            sms: getValues('sms'),
            whatsapp: getValues('whatsapp'),
            carta: getValues('carta'),
            visita: getValues('visita'),
            otro: getValues('otro'),
            hallazgos: hallazgo
        };
        //console.log(new_bitacora);
        mutation.mutate(new_bitacora)


    }
    return (
        <>

            <div className="container mx-auto py-8">
                <Step id={numbStep}></Step>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">Herramientas de gestión</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deudores">
                                    Deudores
                                </label>
                                <input
                                    {...register('deudores', {
                                        required: 'Deudores es requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="deudores"
                                    name="deudores"
                                    placeholder="1000.."
                                />
                                {(errors.deudores != null) && (

                                    <p className="text-red-500">{`${errors.deudores.message}`}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="llamada">
                                    Llamada
                                </label>
                                <input
                                    {...register('llamada', {
                                        required: 'Llamada es requerido',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="llamada"
                                    name="llamada"
                                    placeholder="1000"
                                />
                                {(errors.llamada != null) && (

                                    <p className="text-red-500">{`${errors.llamada.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blaster">
                                    Blaster
                                </label>
                                <input
                                    {...register('blaster', {
                                        required: 'Blaster es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="blaster"
                                    name="blaster"
                                    placeholder="2000"
                                />
                                {(errors.blaster != null) && (

                                    <p className="text-red-500">{`${errors.blaster.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sms">
                                    SMS
                                </label>
                                <input
                                    {...register('sms', {
                                        required: 'SMS es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="sms"
                                    name="sms"
                                    placeholder="2000"
                                />
                                {(errors.sms != null) && (

                                    <p className="text-red-500">{`${errors.sms.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp">
                                    Whatsapp
                                </label>
                                <input
                                    {...register('whatsapp', {
                                        required: 'Whatsapp es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="whatsapp"
                                    name="whatsapp"
                                    placeholder="100"
                                />
                                {(errors.whatsapp != null) && (

                                    <p className="text-red-500">{`${errors.whatsapp.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carta">
                                    Carta
                                </label>
                                <input
                                    {...register('carta', {
                                        required: 'Carta es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="carta"
                                    name="carta"
                                    placeholder="100"
                                />
                                {(errors.carta != null) && (

                                    <p className="text-red-500">{`${errors.carta.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visita">
                                    Visita
                                </label>
                                <input
                                    {...register('visita', {
                                        required: 'Visita es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="visita"
                                    name="visita"
                                    placeholder="50"
                                />
                                {(errors.visita != null) && (

                                    <p className="text-red-500">{`${errors.visita.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otro">
                                    Otro
                                </label>
                                <input
                                    {...register('otro')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="otro"
                                    name="otro"
                                    placeholder="50"
                                />

                            </div>

                        </div>
                    </div>



                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">Hallazgos</h5>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hallazgo">
                                    Descripción
                                </label>
                                <input
                                    {...register('hallazgo')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="hallazgo"
                                    name="hallazgo"
                                    placeholder="..."
                                />

                            </div>


                            <button
                                className="w-full bg-green-500 text-white text-xs font-bold py-2 px-3 rounded-md hover:bg-green-600 transition duration-300"
                                onClick={() => agregarHallazago()}
                                type="button"

                            >
                                Agregar Hallazgo
                            </button>



                        </div>

                        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">

                            <div
                                className="w-full overflow-y-auto border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                style={{ maxHeight: '400px' }}
                            >
                                <div className={`px-5 py-2 pt`}>
                                    {hallazgo.length === 0
                                        ? (
                                            <p className="px-5 py-2 pt">No hay hallazgos agregados</p>
                                        )
                                        : (
                                            <div className="px-5 py-2 pt">
                                                {hallazgo.map((part, index) => (
                                                    <Badge key={index} title={part} onRemove={() => { onRemove(part) }} />
                                                ))}
                                            </div>
                                        )}
                                </div>

                            </div>
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