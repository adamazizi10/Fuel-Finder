'use client'

import { useState } from "react"

 type PositionType = {
    coords: {latitude: number, longitude: number}
 }

 const useTrackLocation = () => {
    const [isFindingLocation, setIsFindingLocation] = useState(false)
    const [longLat, setLongLat] = useState('')
    const [locationErrorMsg, setLocationErrorMsg] = useState('')
    const [userLatitude, setuserLatitude] = useState(0)
    const [userLongitude, setUserLongitude] = useState(0)

    function success(position: PositionType) {
        const latitude = position.coords.latitude
        setuserLatitude(latitude)
        const longitude = position.coords.longitude
        setUserLongitude(longitude)

        setLongLat(`${longitude},${latitude}`)
        setIsFindingLocation(false)
        setLocationErrorMsg('')
    }

    function error() {
        setIsFindingLocation(false)
        setLocationErrorMsg('Unable to retrieve location, make sure your location is enabled')
        console.error('Unable to retrieve location')
    }

    const handleTrackLocation = () => {
        if(!navigator.geolocation) {
            // console.log('Geolocation is not supported by your browser')
            setLocationErrorMsg('Geolocation is not supported by your browser')
        } else {
            // console.log('Locating...')
            setIsFindingLocation(true)
            setLocationErrorMsg('')
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }
    return {
        longLat,
        isFindingLocation,
        locationErrorMsg,
        handleTrackLocation,
        userLatitude,
        userLongitude,
    }
 }

 export default useTrackLocation