import React from 'react'

export const PlaceImg = ({ place, index = 0,className=null }) => {
    if (!place.photos?.length) {
        return ""
    }
    if (!className) {
        className = 'object-cover aspect-square'
    }
    return (
            <img src={'http://localhost:4000/uploads/' + place.photos[index]} alt="" className={className} />
    )
}
