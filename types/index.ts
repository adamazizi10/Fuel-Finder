export type GasStationType = {
    id: string;
    name: string;
    imgUrl: string;
    address: string;
    voting: number;
}

export type MapboxType = {
    id: string;
    properties: {
        address: string;
    };
    text: string;
    center: number[]; // Correctly typed as an array of numbers
}


export type AirtableRecordType = {
    id: string;
    recordId: string;
    fields: GasStationType
}

export type ServerParamsType = {
    params: { id: string }
    searchParams: { id: string }
}

export type State = {
    id: string;
}