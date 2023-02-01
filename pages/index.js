import { useState } from "react";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import prisma from "../prisma/prisma";

import Login from "../components/Login/login";
import TasksList from "../components/Posts/AllTasks";

export default function Home({ providers, feed }) {
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  return (
    <div className="flex justify-center text-center items-center min-h-screen">
      <Login credentials={providers} />
      {status === "authenticated" ? (
        <div>
          <title>Tasks</title>
          <TasksList feed={feed} />
        </div>
      ) : (
        ""
      )}
    </div>
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
