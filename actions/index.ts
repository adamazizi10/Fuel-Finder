'use server'

import { updateGasStation } from "@/lib/airtable"
import { State } from "@/types"

export const upvoteAction = async (prevState: State | undefined) => {
    if (!prevState) {
        // Handle the case where prevState is undefined, or throw an error if this case should never happen
        throw new Error("prevState is undefined");
    }

    const { id } = prevState;
    const data = await updateGasStation(id);
    console.log({ data });

    if(data) {
        return {
            voting: data.length > 0 ? data[0].voting : 0,
            id,
        };
    }
}
