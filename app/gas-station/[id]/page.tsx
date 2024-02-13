import React from 'react';
import Link from 'next/link';
import { fetchGasStation, fetchGasStations } from '@/lib/gas-stations';
import Image from 'next/image';
import { GasStationType, ServerParamsType } from '@/types';
import { createGasStation } from '@/lib/airtable';
import Upvote from '@/components/upvote.client';
import { getDomain } from '@/utils';
import { Metadata } from 'next';

async function getData(id: string) {
  const gasStationsFromMapbox = await fetchGasStation(id)
  const _createGasStation = await createGasStation(gasStationsFromMapbox, id)

  const voting = _createGasStation ? _createGasStation[0].voting : 0

  return gasStationsFromMapbox ? {
    ...gasStationsFromMapbox, voting
  } : {}
}

export async function generateStaticParams() {
  const gasStations = await fetchGasStations('-79.38091975759319%2C43.65633318260601', 6)

  return gasStations.map((gasStation: GasStationType) => ({
    id: gasStation.id
  }))
}

export async function generateMetadata({ params }: ServerParamsType) {
  const gasStation = await fetchGasStation(params.id)

  const { name = '' } = gasStation
  return {
    title: `${name}`,
    description: `${name} - Gas Station`,
    metadatabase: getDomain(),
    alternates: {
      canonical: `/gas-station/${params.id}`,
    },
  }
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;

  const GasStation = await getData(id)

  const { address = '', name = '', imgUrl = '', voting, latitude = '', longitude = '' } = GasStation

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className=''>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to Home</Link>
          </div>
          <div className='my-4'>
            <h1 className='text-4xl'>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={740}
            height={20}
            alt={name}
            className='min-w-full max-w-full min-h-[414px] rounded-lg border-2 lg:max-w-[470px]'
          />
        </div>

        <div className={`glassForGS mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-2 mt-1 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )} <hr />

          {address && (
            <div className="mb-4 mt-4 flex">
              <Image
                src="/static/icons/latlong.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">Latitude: {latitude}</p>
            </div>
          )}<hr />

          {address && (
            <div className="mb-4 mt-4 flex">
              <Image
                src="/static/icons/latlong.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">Longitude: {longitude}</p>
            </div>
          )}<hr />
          <Upvote address={address} voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
