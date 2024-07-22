import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AddressLink } from "../components/AddressLink"
import { PlaceGallery } from "../components/PlaceGallery"
import { BookingDates } from "../components/BookingDates"

export default function BookingPage() {

    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }

    }, [id])

    if (!booking) {
        return ""
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="">{booking.place.address}</AddressLink>
            <div className="my-6 p-6 bg-gray-200 rounded-2xl flex justify-between items-center">
                <div className="">
                    <h2 className="text-2xl mb-4">Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 rounded-2xl text-white">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}