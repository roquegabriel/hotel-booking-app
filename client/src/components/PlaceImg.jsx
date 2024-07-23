import React from 'react'
import Image from './Image'

export const PlaceImg = ({ place, index = 0,className=null }) => {
    if (!place.photos?.length) {
        return ""
    }
    if (!className) {
        className = 'object-cover aspect-square'
    }
    return (
            <Image src={place.photos[index]} alt="" className={className} />
    )
}
