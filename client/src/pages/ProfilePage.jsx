import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { PlacesPage } from "./PlacesPage"
import { AccountNav } from "../components/AccountNav"

export default function ProfilePage() {
    const { user, ready, setUser, setReady } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams()

    const logout = async () => {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (!ready) {
        return <div className="grid place-content-center h-screen" >Loading...</div>
    }
    if (ready && !user && !redirect) {
        <Navigate to={'/login'} />
    }

    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />            
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto ">
                        Logged in as {user.name} ({user.email})
                        <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                    </div>
                )
                ||
                subpage === 'bookings' && (
                    <div className="flex flex-col justify-center h-screen items-center">
                        Here all your bookings
                    </div>
                )
                ||
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    )
}