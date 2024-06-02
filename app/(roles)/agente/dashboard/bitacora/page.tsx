'use client'
import Spinner from '@/app/ui/spiner'
import { auth } from '@/auth';
import { useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'

/* fecha_hora:date
asunto:string
lugar:string
convocado_por:string
id_user:number */


export default function Page() {
    /*   console.log('Client Side Rendering')
  const { data: session } = useSession() // useSession()
 
  useEffect(() => {
    console.log(session); // console.log
  }, [session]) */

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm()

    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: FieldValues) => {

    }
    return (
        <>

            <div className="container mx-auto py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                    <h2 className="text-md mb-6 text-center text-gray-400">Datos Generales: </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nombre y apellido
                            </label>
                            <input
                                {...register('nombre', {
                                    required: 'El nombre y apellido es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Juan Perez"
                            />
                            {(errors.nombre != null) && (

                                <p className="text-red-500">{`${errors.nombre.message}`}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                {...register('email', {
                                    required: 'El email es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="juan@ejemplo.com"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="legajo">
                                Legajo
                            </label>
                            <input
                                {...register('legajo')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="legajo"
                                name="legajo"
                                placeholder="Opcional"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Direccion
                            </label>
                            <input
                                {...register('direccion', {
                                    required: 'La direccion es requerida',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="direccion"
                                name="direccion"
                                placeholder="Direccion actual"
                            />
                            {(errors.direccion != null) && (

                                <p className="text-red-500">{`${errors.direccion.message}`}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="celular">
                                Celular
                            </label>
                            <input
                                {...register('celular', {
                                    required: 'El celular es requerido',
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                type="text"
                                id="celular"
                                name="celular"
                                placeholder="351-XXXXX"
                            />
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