import { Session } from "next-auth"
import { devtools, persist } from 'zustand/middleware'
import create from 'zustand'

interface AuthState {
    session: Session
    setSession: (session: Session) => void
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