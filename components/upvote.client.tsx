'use client'

import { upvoteAction } from '@/actions/index'
import Image from 'next/image'
import React from 'react'
import { State } from "@/types"

import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            className='bg-purple-951 min-w-[120px]'
            type='submit'
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? <Image
                className='m-auto'
                src='/static/icons/loading-spinner.svg'
                width='30'
                height='30'
                alt='Loading' /> : 'Give Stars!'
            }
        </button>
    )
}

export default function Upvote({ voting, id, address}: { voting: number; id: string, address: string; }) {
    const initialState = {
        id,
        voting,
    };

    const [state, dispatch] = useFormState(upvoteAction, initialState);

    return (
        <form action={dispatch}>
            {address && (
            <div className="mb-4 mt-4 flex hover:text-sky-500">&nbsp;
              <Image
                src="/static/icons/map.svg"
                width="18"
                height="18"
                alt="places icon"
                className="hover:text-sky-500" />
              <p className="pl-2">
                <Link href={`https://www.google.com/maps/search/?api=1&query=${address}`} rel="noopener noreferrer" target="_blank">Click here to Get Directions</Link>
              </p>
            </div>
          )}<hr />
            <div className='mb-4 mt-4 flex' >
                <Image
                    src="/static/icons/star.svg"
                    width='24'
                    height='24'
                    alt='star icon'
                />
                <p className='pl-2'>{state?.voting ?? 0}</p>
            </div>
            <SubmitButton />
        </form>
    )
}
