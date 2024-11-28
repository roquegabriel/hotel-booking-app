import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function RegisterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/register', {
                name, email, password
            })
            toast.success("Registration successful. Now you can log in!", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Registration failed!, Please try again later", {
                position: "top-left"
            });
        }

    }

    return (
        <div className="mt-4 flex justify-around items-center grow">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form action="#" className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" name="user" id="user" placeholder="Jhon Doe" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" name="email" id="email" placeholder='user@domain.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" name="password" id="password" placeholder="super secret password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">Already a member? <Link to={'/login'} className="underline text-black">Login</Link></div>
                </form>
            </div>
        </div>
    )
}