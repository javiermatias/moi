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
    nombre_despacho, nombre_atiende, cargo_atiende, participantes, volumen_cartera,
    saldo_cartera,cuota_semana,plantilla_ideal,plantilla_real, telefonicos,
    presenciales,descansos,bajas,altas,cartera_rmd,saldo_cartera_rmd,
    cuota_semana_rmd,total_plan_pago,vigentes,cancelados,normalidad,
    cuota_planes,avance_planes,elaborados,compromiso,pendientes,demandas,
    gestionadas,acuses,pendientes_ciceron,deudores,llamada,blaster,sms,whatsapp,
    carta,visita,otro,hallazgos,acciones,segmento5,cuota5,eficiencia5,
    segmento28,eficiencia28,cuota28,segmento6,cuota6,eficiencia6,
    segmento16,cuota16,eficiencia16,
    banco,prestador,representante_legal,entrevistado

  } = await request.json();

  console.log("entrevistado"+entrevistado)

  
  try {
    // Insert into Bitacora
    const result:any = await executeQuery({
      query: `
        INSERT INTO Bitacora (fecha, asunto, nombre, lugar, convocado, id_user,
          id_despacho,nombre_despacho, nombre_atiende, cargo_atiende, volumen_cartera,
          saldo_cartera,cuota_semana,plantilla_ideal,plantilla_real, telefonicos,
          presenciales,descansos,bajas,altas,cartera_rmd,saldo_cartera_rmd,
          cuota_semana_rmd,total_plan_pago,vigentes,cancelados,normalidad,
          cuota_planes,avance_planes,elaborados,compromiso,pendientes,demandas,
          gestionadas,acuses,pendientes_ciceron,deudores,llamada,blaster,sms,whatsapp,
          carta,visita,otro,segmento5,cuota5,eficiencia5, segmento28,eficiencia28,cuota28,
          segmento6,cuota6,eficiencia6,segmento16,cuota16,eficiencia16,banco,prestador,
          representante_legal,entrevistado
        ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?)`,
      values: [
        fecha, asunto, nombre, lugar, convocado, id_user,
        id_despacho,nombre_despacho, nombre_atiende, cargo_atiende, volumen_cartera,
        saldo_cartera,cuota_semana,plantilla_ideal,plantilla_real, telefonicos,
        presenciales,descansos,bajas,altas,cartera_rmd,saldo_cartera_rmd,
        cuota_semana_rmd,total_plan_pago,vigentes,cancelados,normalidad,
    cuota_planes,avance_planes,elaborados,compromiso,pendientes,demandas,
    gestionadas,acuses,pendientes_ciceron,deudores,llamada,blaster,sms,whatsapp,
    carta,visita,otro,segmento5,cuota5,eficiencia5,
    segmento28,eficiencia28,cuota28,segmento6,cuota6,eficiencia6,
    segmento16,cuota16,eficiencia16,
    banco,prestador,representante_legal,entrevistado
      ]
    });

    console.log(result);

    return new Response(`Bitacora was save success!`, {
      status: 200
    })

    //const bitacoraId = result.insertId;

    // Insert into Participante
/*     for (const participante of participantes) {
      await executeQuery({
        query: 'INSERT INTO Participante (bitacora_id, nombre, puesto) VALUES (?, ?, ?)',
        values: [bitacoraId, participante.nombre, participante.puesto]
      });
    }

    // Insert into Accion
    for (const accion of acciones) {
      await executeQuery({
        query: 'INSERT INTO Accion (bitacora_id, descripcion, responsable, fecha) VALUES (?, ?, ?, ?)',
        values: [bitacoraId, accion.descripcion, accion.responsable, accion.fecha]
      });
    } */

    //console.log('Bitacora inserted successfully!');
  } catch (error) {
    console.error('Error inserting Bitacora:', error);
    return new Response(`${error}`, {
      status: 400
    })
  }


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