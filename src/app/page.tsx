import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import Header from "~/app/_components/Header";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <></>
    // <main>
    //   <h1>Welcome to your Airtable clone!</h1>
    // </main>
  );
}
