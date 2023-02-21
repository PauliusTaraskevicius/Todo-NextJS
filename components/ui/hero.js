import { useSession, signIn } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./navbar";
import Description from "./description";

function Hero({ providers }) {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-7 md:leading-10">
            Schedule Your Day by Creating
            <span className="text-blue-900"> Tasks</span>
            You Need to <span className="text-blue-900"> Accomplish</span>
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-300 font-normal text-center text-sm sm:text-lg">
            A professional, simple website to schedule your day by creating
            everyday tasks to boost your productivity throughout your day.
          </p>
        </div>
        {status === "unauthenticated" ? (
          <div>
            {Object.values(providers).map((provider) => (
              <div
                className="flex justify-center items-center"
                key={provider.name}
              >
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 bg-blue-900 transition duration-150 ease-in-out hover:bg-blue-700 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-blue-700 py-2 sm:py-4 text-sm"
                  onClick={() => signIn(provider.id)}
                >
                  Login with Email
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Navbar />
            <title>{session.user.name} tasks</title>
            <Description feed={feed} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Hero;
