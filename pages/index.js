import { Fragment, useState } from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import prisma from "../prisma/prisma";

import TasksList from "../components/Posts/AllTasks";
import Hero from "../components/ui/hero";
import CreateTaskForm from "../components/Posts/CreatePost";

export default function Home({ providers, feed }) {
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
          <div className="">
            <title>{session.user.name} tasks</title>
            <CreateTaskForm feed={feed} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const data = await prisma.task.findMany({
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
