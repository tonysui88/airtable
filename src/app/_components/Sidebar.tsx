"use client"

import { useContext, useState,  } from "react"
import { api } from "~/trpc/react"

export default function Sidebar () {
    const createBaseMutation = api.base.createBase.useMutation();
    const createTableMutation = api.table.createTable.useMutation();
    // use a cache
    const utils = api.useContext();
    const createBase = api.base.createBase.useMutation({
        onSuccess: () => {
            // mark it stale since now the bases are updated
            utils.base.getAll.invalidate()
        }
    })
    const handleCreateBase = async () => {
        const base = await createBaseMutation.mutateAsync()
        await createTableMutation.mutateAsync({ baseId: base.id })
    }
    return (
        <div className="w-[180px] flex flex-col border-r border-gray-300 h-screen">
            <div className="mb-auto p-2">
                <div className="hover:bg-gray-300 cursor-pointer w-full rounded-lg">
                    <button className="w-full font-semibold p-2 text-left">
                        Home
                    </button>
                </div>
                <div className="cursor-pointer hover:bg-gray-300 w-full rounded-lg">
                    <button className="w-full font-semibold p-2 text-left">
                        Starred
                    </button>
                </div>
                <div className="cursor-pointer hover:bg-gray-300 w-full rounded-lg">
                    <button className="w-full font-semibold p-2 text-left">
                        Shared
                    </button>
                </div>
                <div className="cursor-pointer hover:bg-gray-300 w-full rounded-lg">
                    <button className="w-full font-semibold p-2 text-left">
                        Workplaces
                    </button>
                </div>
            </div>
            <div className="mt-auto p-2">
                <button  
                    className="cursor-pointer font-semibold p-2 bg-blue-300 w-full rounded-lg"
                    onClick={handleCreateBase}>
                    Create Base
                </button>
            </div>
        </div>
    )
}
