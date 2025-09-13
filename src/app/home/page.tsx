"use client"
import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import Header from "~/app/_components/Header";
import { api } from "~/trpc/react";
import Sidebar from "../_components/Sidebar";
import { useState } from "react";
import Table from "../Table.tsx/page";

export default function Home() {
  const [selectedBaseId, setSelectedBaseId] = useState<string | null>(null);
  const { data: bases, isLoading } = api.base.getAll.useQuery()
  
  if (selectedBaseId) {
    return (
      <Table baseId={selectedBaseId}/>
    )
  }

  const colours = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200"];
  return (
    <main className="h-screen flex">
      <Sidebar/>
      {isLoading && (
        <p>Loading...</p>
      )}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 p-8 bg-gray-100 auto-rows-[6rem]">
        {bases?.map((base) =>  {
          const hash = Array.from(base.id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const colourInd = hash % colours.length;
          return (
            <div 
              key={base.id}
              className="flex rounded-lg hover:shadow-2xl items-center p-4 bg-white cursor-pointer"
              onClick={() => setSelectedBaseId(base.id)}>
                <div className={`mr-5 flex items-center justify-center rounded-xl h-12 w-12 ${colours[colourInd]}`}>{base.name.slice(0, 2)}</div>
                {base.name}
            </div>
          )
        })}
      </div>
    </main>
  );
}
