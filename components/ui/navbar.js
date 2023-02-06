import { useState } from "react";

import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          {/* <!-- navbar --> */}
          <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  {/* <!-- logo --> */}
                  <div>
                    <a
                      href="#"
                      className="flex items-center py-5 px-3 text-gray-700"
                    >
                      <svg
                        className="h-6 w-6 mr-1 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span className="font-bold">Better Dev</span>
                    </a>
                  </div>

                  {/* <!-- primary nav --> */}
                  <div className="flex items-center space-x-1 hidden md:flex">
                    <a
                      href="#"
                      className="py-4 px-3 text-gray-700 hover:text-gray-900"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="py-4 px-3 text-gray-700 hover:text-gray-900"
                    >
                      Pricing
                    </a>
                  </div>
                </div>

                {/* <!-- secondary nav --> */}
                <div className="flex items-center space-x-1 hidden md:flex">
                  <button href="" className="py-5 px-3">
                    Signed in as {session.user.name}
                  </button>
                  <button
                    href=""
                    className="py-5 px-3"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>

                {/* <!-- mobile button goes here --> */}
                <div className="md:hidden flex items-center">
                  <button className="mobile-menu-button">
                    <svg
                      onClick={() => setOpen(!open)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- mobile menu --> */}
            <div className={`mobile-menu ${open ? "" : "hidden md:hidden "}`}>
              <a
                href="#"
                className="block py-2 px-4 text-sm hover:bg-gray-200 text-center"
              >
                Features
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-sm hover:bg-gray-200 text-center"
              >
                Pricing
              </a>
              <a
                href=""
                className="block py-2 px-4 text-sm hover:bg-gray-200 text-center"
                onClick={() => signOut()}
              >
                Logout
              </a>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
