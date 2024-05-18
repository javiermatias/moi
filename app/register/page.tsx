'use client';
import { useFormState } from 'react-dom';
import { useForm, type FieldValues } from 'react-hook-form'
import { useState } from 'react';
import Spinner from '../ui/spiner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../lib/actions';

export default function RegisterForm() {
    const initialState = { message: null, errors: {} };
    // const [state, dispatch] = useFormState(registerUser, initialState);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    /*     export type User = {
            id: string;
            name: string; //nombreColaborador
            email: string;
            password: string;
            role: string;
            numeroEmpleado: string;
            posicion: string; //posicionColaborador;
            proyecto: string; //proyectoPerteneces
          }; */

    const onSubmit = async (data: FieldValues) => {




        // To set the incidencia object
        /*      setLoading(true)
             setIncidencia({
               ...incidencia,
               nombre: getValues('nombre'),
               email: getValues('email'),
               legajo: getValues('legajo'),
               celular: getValues('celular'),
               direccion: getValues('direccion') 
             }) */
        //router.push('/empleado/noEnfermedad')

    }

    return (
        <>

            <div className="container mx-auto py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">

                    <h2 className="text-2xl mb-6 text-center text-gray-400">Registro Usuario</h2>


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
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
                        {(errors.email != null) && (
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            <p className="text-red-500">{`${errors.email.message}`}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
                            <input
                                {...register('password', {
                                    required: 'Contraseña es requerida',
                                })}
                                className="w-full px-3 py-2 focus:outline-none"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder=""
                            />
                            {(errors.password != null) && (
                                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                <p className="text-red-500">{`${errors.password.message}`}</p>
                            )}
                            <button
                                type="button"
                                className="px-3 py-2 focus:outline-none"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
                            Numero Empleado
                        </label>
                        <input
                            {...register('numero', {
                                required: 'Numero es requerido',
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="numero"
                            name="numero"
                            placeholder="101..."
                        />
                        {(errors.numero != null) && (
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            <p className="text-red-500">{`${errors.numero.message}`}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="posicion">
                            Posición
                        </label>
                        <input
                            {...register('posicion', {
                                required: 'La posicion es requerida',
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="posicion"
                            name="posicion"
                            placeholder="Posición Colaborador"
                        />
                        {(errors.posicion != null) && (
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            <p className="text-red-500">{`${errors.posicion.message}`}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proyecto">
                            Proyecto
                        </label>
                        <input
                            {...register('proyecto', {
                                required: 'El proyecto es requerido',
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="proyecto"
                            name="proyecto"
                            placeholder="Proyecto al que perteneces"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Registrar'}
                    </button>

                </form>
            </div>

        </>
    );
}


