import { AirtableRecordType, GasStationType } from "@/types";

var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base('appiZOn1zEYn1Gw4x');

const table = base('gas-stations')

//find record
const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
    return records.map((record: AirtableRecordType) => {
        return {
            recordId: record.id,
            ...record.fields
        }
    })
}
const findRecordsByFilter = async (id: string) => {
    const findRecords = await table.select({
        filterByFormula: `id="${id}"`,
    }).firstPage();

    return getMinifiedRecords(findRecords)
}

//create record if not found

export const createGasStation = async (gasStation: GasStationType, id: string) => {
    const { name, address, voting = 0, imgUrl } = gasStation

    try {
        if (id) {
            const records = await findRecordsByFilter(id)
            if (records.length === 0) {
                //create
                const createRecords = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            address,
                            voting,
                            imgUrl,
                        },
                    },
                ])
                if (createRecords.length > 0) {
                    console.log(`Created a store with id: ${id}`)
                    return getMinifiedRecords(createRecords)
                }
            } else {
                return records
            }
        } else {
            console.error('Store id is missing')
        }
    } catch (error) {
        console.error('Error creating or finding a store:', error)
    }
}

export const updateGasStation = async (id: string) => {
    try {
        if (id) {
            const records = await findRecordsByFilter(id)
            if (records.length !== 0) {
                const record = records[0]
                const updatedVoting = record.voting + 1
                //create
                const updatedRecords = await table.update([
                    {
                        id: record.recordId,
                        fields: {
                            voting: updatedVoting
                        },
                    },
                ])
                if (updatedRecords.length > 0) {
                    console.log(`Created a store with id: ${id}`)
                    return getMinifiedRecords(updatedRecords)
                }
            } else {
                console.log('Gas Station does not exist')
                return records
            }
        } else {
            console.error('Store id is missing')
        }
    } catch (error) {
        console.error('Error upvoting a gas station:', error)
    }
}