'use client'
import { Accion } from '@/app/lib/definitions';
import Spinner from '@/app/ui/spiner'
import Step from '@/app/ui/steps';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useBitacoraStore } from '@/app/store/authStore';



export default function Despacho() {

    const { bitacora, setBitacora } = useBitacoraStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm()

    const [loading, setLoading] = useState(false)
    const [hallazgo, setHallazgo] = useState(new Array<string>())
    const searchParams = useSearchParams()
    const numbStep = Number.parseInt(searchParams.get('id') || '0')
    const [acciones, setAcciones] = useState(new Array<Accion>());
    const router = useRouter()

    useEffect(() => {


        if (bitacora.deudores) setValue('deudores', bitacora.deudores);
        if (bitacora.llamada) setValue('llamada', bitacora.llamada);
        if (bitacora.blaster) setValue('blaster', bitacora.blaster);
        if (bitacora.sms) setValue('sms', bitacora.sms);
        if (bitacora.whatsapp) setValue('whatsapp', bitacora.whatsapp);
        if (bitacora.carta) setValue('carta', bitacora.carta);
        if (bitacora.visita) setValue('visita', bitacora.visita);
        if (bitacora.otro) setValue('otro', bitacora.otro);
        if (bitacora.hallazgos) setValue('otro', bitacora.otro);
        if (bitacora.acciones) setAcciones(bitacora.acciones);
        if (bitacora.hallazgos) setHallazgo(bitacora.hallazgos);

    }, [bitacora, setValue])


    const agregarAccion = () => {
        const descripcion = getValues('descripcion');
        const responsable = getValues('responsable');
        const fecha = getValues('fecha');
        const newAccion: Accion = { id: acciones.length + 1, descripcion: descripcion, responsable: responsable, fecha: fecha }
        setAcciones([...acciones, newAccion])

    }

    const agregarHallazago = () => {
        const newHallazgo = getValues('hallazgo');

        setHallazgo([...hallazgo, newHallazgo])

    }

    const removeHallazgo = (name: string) => {
        // Filter out the badge with the specified id
        const updatedHallazgo = hallazgo.filter(badge => badge !== name)

        // Update the state with the filtered badges array
        setHallazgo(updatedHallazgo)

        // console.log("Se borró el número con id " + id);
    }

    const onRemove = (id: number) => {
        // Filter out the badge with the specified id
        const updatedAcciones = acciones.filter(accion => accion.id !== id)

        // Update the state with the filtered badges array
        setAcciones(updatedAcciones)

        // console.log("Se borró el número con id " + id);
    }
    const onSubmit = async (data: FieldValues) => {

        setBitacora({
            ...bitacora,
            deudores: getValues('deudores'),
            llamada: getValues('llamada'),
            blaster: getValues('blaster'),
            sms: getValues('sms'),
            whatsapp: getValues('whatsapp'),
            carta: getValues('carta'),
            visita: getValues('visita'),
            otro: getValues('otro'),
            hallazgos: hallazgo,
            acciones: acciones
        })

        router.push('/agente/dashboard/anexo?id=3')


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

                            <div >
                                {hallazgo.length === 0
                                    ? (
                                        <p className="px-5 py-2 pt">No hay Hallazgos agregados</p>
                                    )
                                    : (
                                        <div >

                                            <table className="w-full border divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 py-2">Nombre</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {hallazgo.map((ph, index) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-2">{ph}</td>
                                                            <td>
                                                                <button onClick={() => removeHallazgo(ph)} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                                                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                    </svg>
                                                                    <span className="sr-only">Eliminar</span>
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                    )}
                            </div>

                        </div>


                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">Compromisos y acciones a realizar</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripcion
                                </label>
                                <input
                                    {...register('descripcion')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder="Juan..."
                                />

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responsable">
                                    Responsable
                                </label>
                                <input
                                    {...register('responsable')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="responsable"
                                    name="responsable"
                                    placeholder="..."
                                />

                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                                    Fecha planeada
                                </label>
                                <input
                                    {...register('fecha')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="fecha"
                                    name="fecha"
                                    placeholder="..."
                                />

                            </div>

                            <div className="mb-4">
                                <label className="max-sm:hidden block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                                    Agregar
                                </label>

                                <button
                                    className="w-full px-3 py-2 bg-green-500 text-white text-xs font-bold  rounded-md hover:bg-green-600 transition duration-300"
                                    onClick={() => agregarAccion()}
                                    type="button"

                                >
                                    Agregar Accion
                                </button>
                            </div>


                        </div>

                        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">

                            <div >
                                {acciones.length === 0
                                    ? (
                                        <p className="px-5 py-2 pt">No hay Acciones agregados</p>
                                    )
                                    : (
                                        <div >

                                            <table className="w-full border divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2">Descripcion</th>
                                                        <th className="px-4 py-2">Responsable</th>
                                                        <th className="px-4 py-2">Fecha</th>
                                                        {/* Add more columns as needed */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {acciones.map((accion) => (
                                                        <tr key={accion.id}>
                                                            <td className="px-4 py-2">{accion.descripcion}</td>
                                                            <td className="px-4 py-2">{accion.responsable}</td>
                                                            <td className="px-4 py-2">{accion.fecha}</td>
                                                            <td>
                                                                <button onClick={() => onRemove(accion.id)} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                                                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                    </svg>
                                                                    <span className="sr-only">Eliminar</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                    )}
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