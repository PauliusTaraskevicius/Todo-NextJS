import { Fragment, useState } from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import prisma from "../prisma/prisma";

import Login from "../components/Login/login";
import TasksList from "../components/Posts/AllTasks";

export default function Home({ providers, feed }) {
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  return (
    <Fragment>
      <div>
        <div className="flex justify-center text-center items-center min-h-screen">
          <Login credentials={providers} />
        </div>
        {status === "authenticated" ? (
          <div className="flex justify-center text-center items-center h-screen">
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
