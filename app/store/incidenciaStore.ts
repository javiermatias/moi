import { Session } from "next-auth"


interface AuthState {
    session: Session
    setToken: (session: Session) => void
}