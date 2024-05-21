'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../lib/actions';
import { useFormStatus } from 'react-dom';
type SubmitButtonProps = {
    label: string;
    loading: React.ReactNode;
};
const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={pending} type="submit">
            {pending ? loading : label}
        </button>
    );
};


export default function RegisterForm() {
    const initialState = { message: null, errors: {} };
    // const [state, dispatch] = useFormState(registerUser, initialState);

    /*  const {
         register,
         handleSubmit,
         formState: { errors },
         getValues
     } = useForm() */
    //const [loading, setLoading] = useState(false)
    const { pending } = useFormStatus();
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

    const onSubmit = async (data: any) => {




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
    //registerUser(formData: FormData)
    return (
        <>

            <div className="container mx-auto py-8">
                <form action={registerUser} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">

                    <h2 className="text-2xl mb-6 text-center text-gray-400">Registro Usuario</h2>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre y apellido
                        </label>
                        <input

                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Juan Perez"
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input

                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="juan@ejemplo.com"
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
                            <input

                                className="w-full px-3 py-2 focus:outline-none"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder=""
                            />

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

                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="numero"
                            name="numero"
                            placeholder="101..."
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="posicion">
                            Posición
                        </label>
                        <input

                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="posicion"
                            name="posicion"
                            placeholder="Posición Colaborador"
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proyecto">
                            Proyecto
                        </label>
                        <input

                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="proyecto"
                            name="proyecto"
                            placeholder="Proyecto al que perteneces"
                        />
                    </div>

                    {/*                <button
                        className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        type="submit"

                    >
                        {pending ? 'Registrando...' : 'Registrar Usuario'}
                    </button> */}

                    <SubmitButton label="Registrar Usuario" loading="Registrando..." />

                </form>
            </div>

        </>
    );
}


