import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { toast } from 'react-toastify';

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            toast.success("Login successfully!", {
                position: "top-center",
            });
            setUser(data)
            setRedirect(true)
        } catch (error) {
            toast.error("Login failed!", {
                position: "top-left"
            });

        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <div className="mt-4 flex justify-around items-center grow">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form action="#" className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                        <input type="email" name="email" id="email" placeholder='user@domain.com' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" name="password" id="password" placeholder="super secret password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button className="primary">Login</button>
                        <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}