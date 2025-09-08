"use client"

export default function Sidebar () {
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
                <button className="cursor-pointer font-semibold p-2 bg-blue-300 w-full rounded-lg">Create</button>
            </div>
        </div>
    )
}
