import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(response => setPlaces(response.data))
    }, [])

    return (
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map((place) => (
                <Link to={`/place/${place._id}`} key={place._id}>
                    <div className="" id={place._id}>
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            {place.photos?.[0] && (
                                <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h3 className="font-semibold leading-4">{place.address}</h3>
                        <h2 className="text-sm leading-4 text-gray-500">{place.title}</h2>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}