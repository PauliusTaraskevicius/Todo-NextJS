import { useSession, signIn, signOut } from "next-auth/react";

function Login({ credentials }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // if (status === "authenticated") {
  //   return (
  //     <div className="flex items-center space-x-1 hidden md:flex">
  //       Signed in as {session.user.email}
  //       <br />
  //       <button className="py-5 px-3" onClick={() => signOut()}>Log out</button>
  //     </div>
  //   );
  // }

  if (status === "unauthenticated") {
    return (
      <div>
        {Object.values(credentials).map((provider) => (
          <div key={provider.name}>
            <button className="py-5 px-3" onClick={() => signIn()}>
              Login
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Login;
