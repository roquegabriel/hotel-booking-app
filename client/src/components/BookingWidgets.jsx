import { useContext, useEffect, useState } from "react"
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const BookingWidgets = ({ place }) => {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
    const bookPlace = async () => {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <div className='bg-white p-4 rounded-2xl shadow'>
                <div className='text-2xl text-center'>
                    Price: {place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className='py-3 px-4'>
                            <label htmlFor="check-in">Check in:</label>
                            <input type="date" name="check-in" id="check-in" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        </div>
                        <div className='py-3 px-4 border-l'>
                            <label htmlFor="check-out">Check out:</label>
                            <input type="date" name="check-out" id="check-out" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        </div>
                    </div>
                    <div className='py-3 px-4 border-t'>
                        <label htmlFor="number-guests">Number of guests:</label>
                        <input type="number" name="number-guests" id="number-guests" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                    </div>
                    {
                        numberOfNights > 0 && (
                            <div className='py-3 px-4 border-t'>
                                <label htmlFor="full-name">Your full name</label>
                                <input type="text" name="full-name" id="full-name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        )
                    }
                </div>
                <button className='primary mt-4' onClick={bookPlace}>
                    Book this place
                    {numberOfNights > 0 && (
                        <>
                            <span> ${numberOfNights * place.price}</span>
                        </>
                    )}
                </button>
            </div>
        </>
    )
}