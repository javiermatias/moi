import { Session } from "next-auth"
import { devtools, persist } from 'zustand/middleware'
import create from 'zustand'
import { Bitacora, Participante } from "../lib/definitions"

interface AuthState {
    session: Session
    setSession: (session: Session) => void
}
interface BitacoraState {
    bitacora: Bitacora
    setBitacora: (incidencia: Bitacora) => void
}
export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                session: {
                    expires: ""
                },
                setSession: (session) => { set({ session }) }, // Update the state with the new incidencia object

            }),
            {
                name: 'session-store',
            }
        )
    )
)
/* 
export type Bitacora = {
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

} */

export const useBitacoraStore = create<BitacoraState>()(
    devtools(
        persist(
            (set) => ({
                bitacora: {
                    asunto: '',
                    nombre: '', //nombreColaborador
                    fecha: '',
                    lugar: '',
                    convocado: '',//convocadoPor
                    id_user: 0,
                    id_despacho: '',
                    nombre_despacho: '',
                    nombre_atiende: '',
                    cargo_atiende: '',
                    participantes: new Array<Participante>()
                },
                setBitacora: (bitacora) => { set({ bitacora }) }, // Update the state with the new incidencia object

            }),

            {
                name: 'bitacora-store',
            }
        )
    )
)