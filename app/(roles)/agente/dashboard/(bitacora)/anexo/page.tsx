'use client'
import Spinner from '@/app/ui/spiner'
import Step from '@/app/ui/steps';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useBitacoraStore } from '@/app/store/authStore';

export default function Anexo() {

    const { bitacora, setBitacora } = useBitacoraStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm()

    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const numbStep = Number.parseInt(searchParams.get('id') || '0')
    const router = useRouter()

    useEffect(() => {


     /*    if (bitacora.volumen_cartera) setValue('volumen_cartera', bitacora.volumen_cartera);
        if (bitacora.saldo_cartera) setValue('saldo_cartera', bitacora.saldo_cartera); */


    }, [bitacora, setValue])

    const onSubmit = async (data: FieldValues) => {

        setBitacora({
            ...bitacora,
            banco: getValues('banco'),
            prestador: getValues('prestador'),
            representante_legal: getValues('representante'),
            entrevistado: getValues('entrevista')
            
        })

        router.push('/agente/dashboard/herramientas?id=2')

    }
    return (
        <>

            <div className="container mx-auto py-8">
                <Step id={numbStep}></Step>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 mx-3">
                        <h5 className="text-xl font-bold mb-2 text-center">ANEXO.</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="banco">
                                    EL BANCO
                                </label>
                                <input
                                    {...register('banco', {
                                        required: '',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="banco"
                                    name="banco"
                                    disabled
                                />
                                {(errors.banco != null) && (

                                    <p className="text-red-500">{`${errors.banco}`}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prestador">
                                    EL PRESTADOR
                                </label>
                                <input
                                    {...register('prestador', {
                                        required: 'El prestador es requerido',
                                    })}
                                    className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="prestador"
                                    name="prestador"
                                    placeholder="NOMBRE O RAZÓN SOCIAL DEL DESPACHO"
                                />
                                {(errors.prestador != null) && (

                                    <p className="text-red-500">{`${errors.prestador.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="atiende">
                                    Firma entrevistador
                                </label>
                                <input
                                    {...register('cuota_semana', {
                                        required: 'La cuota de la semana es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="cuota_semana"
                                    name="cuota_semana"
                                    placeholder="3.."
                                />
                                {(errors.cuota_semana != null) && (

                                    <p className="text-red-500">{`${errors.cuota_semana.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="atiende">
                                    Firma entrevistado
                                </label>
                                <input
                                    {...register('cuota_semana', {
                                        required: 'La cuota de la semana es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="cuota_semana"
                                    name="cuota_semana"
                                    placeholder="3.."
                                />
                                {(errors.cuota_semana != null) && (

                                    <p className="text-red-500">{`${errors.cuota_semana.message}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representante">
                                    Representante Legal
                                </label>
                                <input
                                    {...register('representante', {
                                        required: 'La cuota de la semana es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="representante"
                                    name="representante"
                                    placeholder="Nombre de quien hace la minuta"
                                />
                                {(errors.representante != null) && (

                                    <p className="text-red-500">{`${errors.representante}`}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entrevistado">
                                    Entrevistado
                                </label>
                                <input
                                    {...register('entrevistado', {
                                        required: 'La cuota de la semana es requerida',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="entrevistado"
                                    name="entrevistado"
                                    placeholder="Persona que se entrevista"
                                />
                                {(errors.entrevistado != null) && (

                                    <p className="text-red-500">{`${errors.entrevistado}`}</p>
                                )}
                            </div>


                        </div>
                        <p className="text-sm font-bold mb-2 text-center text-red-400 ">ESTOY ENTERADO Y FIRMO DE CONFORMIDAD.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md mb-4 w-full p-2 md:p-6">
                        <h5 className="text-xl font-bold mb-2 text-center">ENVIAR POR TELEGRAM O CORREO </h5>
                        <p className="text-sm">
                            Cumplir con Indicadores (Eficiencia, EPR, Cobranza, RMD, Planes de Pago, Abonos, otros.)
                        </p>
                        <p className="text-sm">
                            Horario de 8:00 a 21:00 hrs los 7 días de la semana.
                        </p>
                        <p className="text-sm">
                            Proporcionar información de gestion.
                        </p>
                        <p className="text-sm">
                            Plantilla especializada en segmento, planes de pago, productos (Consumo, TOR, Italika, otros),
                        </p>
                        <p className="text-sm">
                            Gestores finales registrados en SCL y contar con conexión (6 dias a la semana)
                        </p>
                        <p className="text-sm">
                            Utilizar las herramientas de CL (Paga Fácil, Pagaré Electrónico, Aztecargo, Demanda Digital, Movilizate)
                        </p>
                        <p className="text-sm">
                            Envió semanal de carteo.
                        </p>

                        <p className="text-sm font-bold mb-2 text-center text-red-400 ">El incumplimiento de las reglas operativas, estan estipuladas en contrato y podran ser motivo de sanción.</p>

                    </div>





                    <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Cargar Bitacora'}
                    </button>

                </form>
            </div>

        </>
    )
}