"use client"

import { useContext, useState,  } from "react"
import { api } from "~/trpc/react"

export default function SmallSidebar () {
    // use a cache
    const utils = api.useContext();
    return (
        <div className="w-[90px] flex flex-col border-r border-gray-300 h-screen">
            <div className="mb-auto p-2">
                <div className="cursor-pointer hover:bg-gray-300 w-full rounded-lg">
                    <button className="w-full font-semibold p-2 text-left">
                        
                    </button>
                </div>
            </div>
            <div className="mt-auto p-2">
                <button  
                    className="cursor-pointer font-semibold p-2 bg-blue-300 w-full rounded-lg">
                    Profile 
                </button>
            </div>
        </div>
    )
}
