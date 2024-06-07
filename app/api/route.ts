import { type NextRequest } from 'next/server'
import executeQuery from '../lib/db';


export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
  try {
    //console.log("req nom", req.body)
    const result = await executeQuery({
      query: 'INSERT INTO bitacora (fecha_hora, asunto, lugar, convocado_por) VALUES (?, ?, ?, ?)',
      values: [
        '2024-05-23 14:30:00',  // fecha_hora
        'Reunión de Proyecto',    // asunto
        'Sala de Conferencias',   // lugar
        'Juan Pérez'              // convocado_por
      ]
    });
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
  return new Response(`Hello, Next.js! token=${token?.value}`, {
    status: 200,
    headers: { 'Set-Cookie': `token=${token?.value}` },
  })
}

export async function POST(request: NextRequest) {
  const { asunto, nombre, fecha, lugar, convocado, id_user, id_despacho,
    nombre_despacho, nombre_atiende, cargo_atiende, participantes
  } = await request.json();

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
    participantes: Participante[];
  
  } */


  console.log(asunto);
  console.log(nombre);
  console.log(fecha);
  console.log(lugar);
  console.log(convocado);
  console.log(id_user);
  console.log(id_despacho);
  console.log(nombre_despacho);
  console.log(nombre_atiende);
  console.log(cargo_atiende);
  console.log(participantes);

  return new Response(`Hello, Next.js!`, {
    status: 200
  })
  /*   try {
      //console.log("req nom", req.body)
      const result = await executeQuery({
        query: 'INSERT INTO bitacora (fecha_hora, asunto, lugar, convocado_por) VALUES (?, ?, ?, ?)',
        values: [
          '2024-05-23 14:30:00',  // fecha_hora
          'Reunión de Proyecto',    // asunto
          'Sala de Conferencias',   // lugar
          'Juan Pérez'              // convocado_por
        ]
      });
      return new Response('Bitacora created sucesfully')
    } catch (error) {
      console.log(error);
    } */
  /*   return new Response(`Hello, Next.js! token=${token?.value}`, {
      status: 200,
      headers: { 'Set-Cookie': `token=${token?.value}` },
    }) */
}