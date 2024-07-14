import executeQuery from "@/app/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    let result: any="";
    try {    
        result = await executeQuery({
        query: 'SELECT count FROM Bitacora where',
        values: []
      });
      //console.log(result)
      
    } catch (error) {
      console.log(error);
    }
    console.log("ttt", result);
    //const re = result.result;
    return Response.json({ result })
  } 