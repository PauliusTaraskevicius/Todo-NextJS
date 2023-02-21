import React from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import { db } from "../prisma/prisma";

import Hero from "../components/ui/hero";
import Navbar from "../components/ui/navbar";
import Description from "../components/ui/description";

export default function Home({ providers, csrfToken, feed }) {
  const { data: session, status } = useSession();

  return (
    <React.Fragment>
      <div>
        {status === "unauthenticated" ? (
          <div className="flex justify-center items-center h-screen">
            <Hero providers={providers} />
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

// export async function getStaticProps(context) {
//   // const providers = await getProviders();
//   // const csrfToken = await getCsrfToken(context);

//   const data = await db.task.findMany({
//     include: { author: true },
//   });

//   const feed = data.sort(function (a, b) {
//     if (a.createdAt > b.createdAt) {
//       return -1;
//     }
//     if (a.createdAt < b.createdAt) {
//       return 1;
//     }
//     return 0;
//   });

//   return {
//     props: { providers, feed: JSON.parse(JSON.stringify(feed)) },
//     revalidate: 10,
//   };
// }

export async function getServerSideProps() {
  const providers = await getProviders();
  
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

  return {
      props: {
          providers,
          feed: JSON.parse(JSON.stringify(feed))
      }
  }
}