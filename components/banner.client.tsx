'use client';

import { MouseEventHandler } from "react";

const Banner = ({ handleOnClick, buttonText }:
    { handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined, buttonText: string }) => {
    return (
        <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
            <div className="z-20 flex flex-col px-2 md:pt-12">
                <h1 className="my-2 flex-wrap">
                    <span className="pr-2 text-white">Fuel</span>
                    <span className="text-gray-900">Finder</span>
                </h1>
                <p className="font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl">
                    Locate the Nearest Gas Stations!
                </p>
                <div className="mt-12">
                    <button onClick={handleOnClick}>{buttonText}</button>
                </div>
            </div>
        </div>
    );
};


export default Banner;
