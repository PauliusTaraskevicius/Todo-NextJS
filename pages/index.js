import React from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import { db } from "../prisma/prisma";

import Hero from "../components/ui/hero";
import Navbar from "../components/ui/navbar";
import Description from "../components/ui/description";

export default function Home({ providers, feed }) {
  const { data: session, status } = useSession();

  return (
    <React.Fragment>
      <div>
        {status === "unauthenticated" ? (
          <div className="flex justify-center items-center h-screen">
            <Hero credentials={providers} />
          </div>
        ) : (
          ""
        )}

        {status === "authenticated" ? (
          <div>
            <Navbar />
            <title>{session.user.name} tasks</title>
            <Description feed={feed} />
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  const data = await db.task.findMany({
    include: { author: true },
  });
  const feed = data.sort(function (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  });
  const providers = await getProviders(context);
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)), providers },
    revalidate: 10,
  };
}
