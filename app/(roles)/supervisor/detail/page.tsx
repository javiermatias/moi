'use client'
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function Page({
    searchParams,
  }: {
    searchParams?: {     
      id?: string;
    };
  }) {
    const currentPage = Number(searchParams?.id) || 1;
    const { isPending, error, data,isSuccess } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch(`/api/detail?id=${currentPage}`).then((res) =>
            res.json(),
          ),
      })
      const [inputs, setInputs] = useState({
        fecha:'',
        asunto: '',
        nombre: '',
        lugar:'',
        convocado:'',
        id_despacho:'',
        nombre_despacho:'',
        nombre_atiende:'',
        cargo_atiende:'',
        participantes:[],
        semana:'',
        hora:''
        // Add more fields as needed
      });
      useEffect(() => {
        if (isSuccess && data) {
          setInputs({
            fecha: new Date(data.bitacora.fecha).toLocaleDateString() || '',
            asunto: data.bitacora.asunto|| '',
            nombre: data.bitacora.nombre || '',
            nombre_atiende:data.bitacora.nombre_atiende || '',
            lugar: data.bitacora.lugar || '',
            convocado: data.bitacora.convocado || '',
            id_despacho: data.bitacora.id_despacho || '',
            nombre_despacho: data.bitacora.id_despacho || '',
            cargo_atiende: data.bitacora.cargo_atiende || '',
            participantes:data.participante|| [],
            semana:  DateTime.fromISO(data.bitacora.fecha).weekNumber.toString() || '',
            hora:DateTime.fromISO(data.bitacora.fecha).toFormat('HH:mm').toString() || ''
            // Map other fields as needed
          });
        }
      }, [isSuccess, data]);
    

    if(isPending) return <>Loading...</>

    if(isSuccess){

        console.table(data);
    }

    return (
      <div className="w-full container mx-auto py-8">
  
      <form className="w-full max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-md shadow-md">

          <div className="bg-white rounded-lg shadow-md  mb-4 w-full p-2 md:p-6">
              <h5 className="text-xl font-bold mb-2 text-center">Datos Generales</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-2 md:p-6">

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                          Fecha
                      </label>

                      <input
                         
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                          type="text"
                          id="fecha"
                          name="fecha"
                          defaultValue={inputs.fecha}
                      

                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="asunto">
                          Asunto
                      </label>

                      <input
                         
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                          type="text"
                          id="asunto"
                          name="asunto"
                          defaultValue={inputs.asunto}
                      

                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lugar">
                          Lugar
                      </label>
                      <input
                         
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                          type="text"
                          id="lugar"
                          name="lugar"
                          defaultValue={inputs.lugar}
                         
                      />
                   
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="convocado">
                          Convocado por
                      </label>
                      <input
                                                   
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                          type="text"
                          id="convocado"
                          name="convocado"
                          defaultValue={inputs.convocado}
                         
                      />
                   
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Semana">
                          Semana
                      </label>
                      <input
                                                   
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                          type="text"
                          id="semana"
                          name="semana"
                          defaultValue={inputs.semana}
                         
                      />
                   
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
                          Hora
                      </label>
                      <input
                                                   
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                          type="text"
                          id="hora"
                          name="hora"
                          defaultValue={inputs.hora}
                         
                      />
                   
                  </div>

              </div>

          </div>


          <div className="bg-white rounded-lg shadow-md  mb-4 w-full p-2 md:p-6">
              <h5 className="text-xl font-bold mb-2 text-center">Datos Despacho</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-2 md:p-6">

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="despacho">
                          ID despacho
                      </label>
                      <input
                          
                          className="w-full px-3 py-2 border border-gray-300 rounded-md  text-gray-900 focus:outline-none focus:border-blue-500"
                          type="text"
                          id="despacho"
                          name="despacho"
                          defaultValue={inputs.id_despacho}
                         
                      />
                   
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombredespacho">
                          Nombre Despacho
                      </label>
                      <input
                          
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                          type="text"
                          id="nombredespacho"
                          name="nombredespacho"
                          defaultValue={inputs.nombre_despacho}
                          
                      />
                
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="atiende">
                          Nombre de quien atiende
                      </label>
                      <input
                          
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                          type="text"
                          id="atiende"
                          name="atiende"
                          defaultValue={inputs.nombre_atiende}
                         
                      />
                   
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cargo">
                          Cargo de quien atiende
                      </label>
                      <input
                          
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                          type="text"
                          id="cargo"
                          name="cargo"
                          defaultValue={inputs.cargo_atiende}
                      />
                   
                  </div>

              </div>
          </div>



          <div className="bg-white rounded-lg shadow-md  mb-4 w-full p-2 md:p-6">
              <h5 className="text-xl font-bold mb-2 text-center">Participantes Reunion</h5>
          

            <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">

                  <div
                      className="w-full overflow-y-auto border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"

                  >
                      <div className={`px-5 py-2 pt`}>
                          {inputs.participantes.length === 0
                              ? (
                                  <p className="px-5 py-2 pt">No hay participantes agregados</p>
                              )
                              : (
                                  <div className="px-5 py-2 pt">
                                    <ul>
                                   {inputs.participantes.map((part:any) => (
                                    <li key={part.id}>
                                     {part.nombre} - {part.puesto}
                                     </li>))}
                                    </ul>
                                  </div>
                              )}
                      </div>

                  </div>
              </div> 
          </div>




      </form>
  </div>
      );
}