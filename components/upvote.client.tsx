'use client'

import { upvoteAction } from '@/actions/index'
import Image from 'next/image'
import React from 'react'
import { State } from "@/types"

import { useFormState, useFormStatus } from 'react-dom'

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

export default function Upvote({ voting, id }: { voting: number; id: string }) {
    const initialState = {
        id,
        voting,
    };

    const [state, dispatch] = useFormState(upvoteAction, initialState);

    return (
        <form action={dispatch}>
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
