import Card from '@/components/card.server';
import NearbyGasStations from '@/components/nearby-gas-stations.client';
import { fetchGasStations } from '@/lib/gas-stations';
import { GasStationType } from '@/types';
import { getDomain } from '@/utils';
import { Metadata } from 'next';

async function getData() {

  if(!process.env.MAPBOX_API || !process.env.AIRTABLE_TOKEN) {
    throw new Error('One of the API keys is not configured')
  }
  const TORONTO_LONG_LAT = '-79.38091975759319%2C43.65633318260601'
  return await fetchGasStations(TORONTO_LONG_LAT, 6)
}

export const metadata: Metadata = {
  title: "Fuel Finder",
  description: "Find the nearest Gas Stations",
  metadataBase: getDomain(),
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const gasStations = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyGasStations />

        <div className='mt-20'>
          <h2 className='mt-8 pb-8 text-4xl font-bold text-white'>Toronto Gas Stations</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6'>
            {gasStations.map((gasStation: GasStationType, idx: number) => (
              <Card
                key={`${gasStation.name}-${gasStation.id}`}
                name={gasStation.name}
                imgUrl={`/static/GS_${idx+1}.jpeg`} // logic to determine file extension based on index
                href={`/gas-station/${gasStation.id}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
