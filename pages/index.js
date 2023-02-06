import { Fragment, useState } from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import prisma from "../prisma/prisma";

import TasksList from "../components/Posts/AllTasks";
import Hero from "../components/ui/hero";

export default function Home({ providers, feed }) {
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  return (
    <Fragment>
      <div>
        {status === "unauthenticated" ? (
          <div className="flex justify-center items-center h-screen bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
            <Hero credentials={providers} />
          </div>
        ) : (
          ""
        )}

        {status === "authenticated" ? (
          <div className="flex justify-center items-center h-screen">
            <title>{session.user.name} tasks</title>
            <TasksList feed={feed} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const feed = await prisma.task.findMany({
    include: { author: true },
  });
  const providers = await getProviders(context);
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)), providers },
    revalidate: 10,
  };
}
