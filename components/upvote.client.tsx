'use client'

import { upvoteAction } from '@/actions/index'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { State } from "@/types"

import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import useTrackLocation from '@/hooks/use-track-location'
import { haversine } from '@/utils'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <></>
        // <button
        //     className='bg-purple-951 min-w-[120px]'
        //     type='submit'
        //     disabled={pending}
        //     aria-disabled={pending}
        // >
        //     {pending ? <Image
        //         className='m-auto'
        //         src='/static/icons/loading-spinner.svg'
        //         width='30'
        //         height='30'
        //         alt='Loading' /> : 'Give Stars!'
        //     }
        // </button>
    )
}

export default function Upvote({ voting, id, address, latitude, longitude }: { voting: number; id: string, address: string, latitude: number, longitude: number }) {
    const initialState = {
        id,
        voting,
    };
    const { handleTrackLocation, userLatitude, userLongitude } = useTrackLocation();
 
    const [state, dispatch] = useFormState(upvoteAction, initialState);
    const [distance, setDistance] = useState<number | null>(null);
    
    // useEffect(() => {
    //     handleTrackLocation(); // This will trigger location fetching
    // }, []);

    useEffect(() => {
        if (userLatitude && userLongitude && latitude && longitude) {
            const dist = haversine(userLatitude, userLongitude, latitude, longitude);
            setDistance(dist);
        }
    }, [userLatitude, userLongitude, latitude, longitude]);
    return (

        <form action={dispatch}>
            {/* {address && (
                <div className="mb-4 mt-4 flex">
                    <Image
                        src="/static/icons/latlong.svg"
                        width="24"
                        height="24"
                        alt="places icon"
                    />
                    <p className="pl-2">Distance: {distance}</p>
                </div>
            )}<hr /> */}
            {address && (
                <div className="mb-4 mt-8 flex hover:text-sky-500">&nbsp;&nbsp;
                    <Image
                        src="/static/icons/map.svg"
                        width="18"
                        height="18"
                        alt="places icon"
                        className="hover:text-sky-500" />
                    <p className="pl-2">&nbsp;&nbsp;
                        <Link href={`https://www.google.com/maps/place/${latitude},${longitude}`} rel="noopener noreferrer" target="_blank">Click here to Get Directions</Link>
                    </p>
                </div>
            )}
            {/* <div className='mb-4 mt-4 flex' >
                <Image
                    src="/static/icons/star.svg"
                    width='24'
                    height='24'
                    alt='star icon'
                />
                <p className='pl-2'>{state?.voting ?? 0}</p>
            </div>
            <SubmitButton /> */}
        </form>
    )
}
