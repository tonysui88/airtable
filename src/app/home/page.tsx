import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import Header from "~/app/_components/Header";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Sidebar from "../_components/Sidebar";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <main className="h-screen">
      <Sidebar/>
    </main>
  );
}
