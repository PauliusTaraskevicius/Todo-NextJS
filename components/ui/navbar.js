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
          <nav className="bg-transparent">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  {/* <!-- logo --> */}
                  <div>
                    <a
                      href="#"
                      className="flex items-center py-5 px-3 text-white"
                    >
                      <svg
                        className="h-6 w-6 mr-2 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>

                      <span className="font-bold">Todo App</span>
                    </a>
                  </div>
                </div>

                {/* <!-- secondary nav --> */}
                <div className="flex items-center space-x-1 hidden md:flex">
                  <button href="" className="py-5 px-3 text-white">
                    Signed in as {session.user.name}
                  </button>
                  <button
                    href=""
                    className="py-5 px-3 text-white"
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
                      className="h-6 w-6 text-white"
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
                href=""
                className="block py-2 px-4 text-sm hover:bg-gray-200 text-center text-white"
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
