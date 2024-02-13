import { MapboxType } from "@/types"

const transformGasStationData = (result: MapboxType) => {
    return {
        id: result.id,
        address: result.properties?.address || '',
        name: result.text,
        imgUrl: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        longitude: result.center[0],
        latitude: result.center[1],
    }
}
export const fetchGasStations = async (longLat: string, limit: number) => {
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/gas%20station.json?limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`)
        const data = await response.json()
        return data?.features?.map((result: MapboxType) => transformGasStationData(result)) || []
    } catch (error) {
       console.error('Error while fetching gas stations', error) 
       return []
    }
}

export const fetchGasStation = async ( id: string ) => {
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`)
        const data = await response.json()

        const GasStation = data?.features?.map((result: MapboxType) => transformGasStationData(result)) || []
        return GasStation.length > 0 ? GasStation[0] : {}

    } catch (error) {
       console.error('Error while fetching gas stations', error) 
       return []
    }
}