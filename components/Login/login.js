import { useSession, signIn, signOut } from "next-auth/react";

function Login({ credentials }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        Signed in as {session.user.email} {session.user.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div>
        {Object.values(credentials).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn()}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Login;
