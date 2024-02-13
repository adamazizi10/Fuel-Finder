'use client'
import React, { useEffect, useState } from 'react';
import Banner from './banner.client';
import useTrackLocation from '@/hooks/use-track-location';
import Card from './card.server';
import { GasStationType } from '@/types';

export default function NearbyGasStations() {
    const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } = useTrackLocation();
    const [gasStations, setGasStations] = useState([]);

    const handleOnClick = () => {
        handleTrackLocation(); 
    }

    useEffect(() => {
        const savedGasStations = sessionStorage.getItem('gasStations');
        if (savedGasStations) {
            setGasStations(JSON.parse(savedGasStations));
        }
    }, []);

    useEffect(() => {
        async function gasStationsByLocation() {
            if (longLat) {
                try {
                    const limit = 9;
                    const response = await fetch(`/api/getGasStationsByLocation?longLat=${longLat}&limit=${limit}`);
                    const data = await response.json();
                    setGasStations(data);
                    sessionStorage.setItem('gasStations', JSON.stringify(data)); // Save fetched gas stations in sessionStorage
                } catch (error) {
                    console.error(`Error occurred: ${error}`);
                }
            }
        }
        if (longLat) { // Fetch new data only if longLat is available, indicating that the button was clicked
            gasStationsByLocation();
        }
    }, [longLat]);

    return (
        <div>
            <Banner handleOnClick={handleOnClick} buttonText={isFindingLocation ? 'Locating...' : 'View Nearby Gas Stations'} />
            {locationErrorMsg && <p className='text-2xl text-red-600'>Error: {locationErrorMsg}</p>}
            {gasStations.length > 0 && (
                <div className='mt-20'>
                    <h2 className='mt-8 pb-8 text-4xl font-bold text-white'>Gas Stations Near Me</h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6'>
                        {gasStations.map((gasStation: GasStationType, idx: number) => (
                            <Card
                                key={`${gasStation.name}-${gasStation.id}`}
                                name={gasStation.name}
                                imgUrl={`/static/GS_${9 - idx}.jpeg`} 
                                href={`/gas-station/${gasStation.id}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
