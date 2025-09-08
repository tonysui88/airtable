"use client"

import { signIn, useSession, signOut } from "next-auth/react"

export default function Header () {
    const { data: session, status } = useSession();
    return (
        <header className="h-[80px] flex items-center border-b-1 border-gray-300">
        <div className="w-[220px] h-[72px]">
            <img 
            src={'https://i.pcmag.com/imagery/reviews/06GdAglsVsGlkBgtUw4Dtwb-13.fit_lim.size_1050x591.v1741201484.png'} 
            width={220} 
            height={72} 
            alt="Logo" 
            className="w-full h-full object-contain"
            />
        </div>
        {status === "loading" ? (
            <button className="ml-auto w-40 h-12 rounded-2xl bg-gray-400 text-white font-semibold shadow flex items-center justify-center mr-2">
                Loading...
            </button>
        ) : session ? (
            <div className="ml-auto flex items-center gap-4 mr-2">
                <span className="text-black font-semibold">{session.user?.name}</span>
                <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-2xl bg-black text-white font-semibold shadow w-22 h-12">
                Logout
                </button>
            </div>
        ) : (
        <button 
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="ml-auto rounded-2xl bg-black text-white font-semibold shadow flex items-center justify-center w-22 h-12 mr-2 hover: cursor-pointer">
                Login
        </button>)}
        </header>
    )
}
