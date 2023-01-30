import { getProviders } from "next-auth/react";

import Login from "../components/Login/login";

export default function Home({ providers }) {
  return (
    <div>
      <Login credentials={providers}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders(context);
  return {
    props: { providers },
  };
}
