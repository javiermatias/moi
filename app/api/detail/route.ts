import executeQuery from '@/app/lib/db';
import { type NextRequest } from 'next/server'

 export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams; 


  const id = parseInt(searchParams.get('id') || '1', 10);

  let result: any="";
  try {    
      result = await executeQuery({
      query: 'SELECT * FROM Bitacora where id=?',
      values: [id]
    });
    //console.log(result)
    
  } catch (error) {
    console.log(error);
  }
  console.log("ttt", result);
  //const re = result.result;
  return Response.json({ result })
} 