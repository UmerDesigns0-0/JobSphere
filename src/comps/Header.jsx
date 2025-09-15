import { useState, useEffect } from "react";
import logo from "../assets/imgs/logo.png";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./ToggleMode";
import SignIn from "./SignIn";
import Register from "./Register";
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser); // Debug log
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, [])

  

  const activeLink = ({ isActive }) =>
    isActive
      ? "!transition-colors !duration-300 text-indigo-600 dark:text-amber-400 transition hover:text-gray-500/75  dark:hover:text-white/75"
      : "text-gray-800 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75";

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const toggleDropdown = () => {
    setIsOn(!isOn);
  };

  const closeDropdown = () => {
    setIsOn(false);
  };

  // Fixed logOut function - no event parameter needed
  const logOut = async () => {
    try {
      console.log("Attempting to sign out...");
      await signOut(auth);
      console.log("Sign out successful");
      toast.success(`Logged out successfully!`);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Debug log to see current user state
  // console.log("Current user:", user);

  return (
    <header className="bg-white dark:bg-header-bg border-b-2 border-slate-200 dark:border-0 sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-2 lg:px-8">
        <div className="flex h-16 items-center gap-2 md:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Mobile Burger Button */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <NavLink className="block text-teal-600 dark:text-teal-600" to="/">
              <span className="sr-only">Home</span>
              <img
                className="h-10 w-auto select-none"
                src={logo}
                alt="Home_Logo"
                draggable="false"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavLink className={activeLink} to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLink} to="/About">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLink} to="/AllJobs">
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLink} to="/AddJob">
                    Add Job
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Side (buttons + burger) */}
          <div className="flex items-center gap-4 justify-end flex-1 md:justify-end">
            <DarkModeToggle />
            {!user && (
              <div className="hidden sm:flex sm:gap-4">
                <button
                  onClick={() => setModal("login")}
                  type="button"
                  data-modal-target="authentication-modal"
                  className="login"
                >
                  Login
                </button>
                <div className="hidden sm:flex">
                  <button
                    className="register"
                    onClick={() => setModal("register")}
                    type="button"
                    data-modal-target="register-modal"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            {/* Login & Register Modals */}
            {modal === "login" && (
              <SignIn
                onSwitch={() => setModal("register")}
                onClose={() => setModal(null)}
              />
            )}
            {modal === "register" && (
              <Register
                onSwitch={() => setModal("login")}
                onClose={() => setModal(null)}
              />
            )}
          </div>

          {/* User dropdown */}
          {user && (
            <div className="relative">
              {/* User Avatar Button */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isOn}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  src={auth.currentUser?.photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                  alt="user photo"
                />
              </button>

              {/* Dropdown Menu */}
              {isOn && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={closeDropdown} />

                  <div className="absolute right-0 z-50 mt-2 w-44 bg-gray-100 divide-y divide-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                    {/* User Info Section */}
                    <div title={user.displayName} className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.displayName || "User"}
                      </span>
                      <span title={user.email} className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <ul className="py-2">
                      <li>
                        <NavLink to="/MyJobs">
                        <button onClick={closeDropdown}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          My Jobs
                        </button>
                        </NavLink>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={async () => {
                            const confirmLogout = window.confirm(
                              "Are you sure you want to log out?"
                            );
                            if (!confirmLogout) return;
                            
                            closeDropdown();
                            await logOut(); // Fixed: removed event parameter and added await
                          }}
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <nav
          className={`md:hidden overflow-hidden !transition-all !duration-300 ease-in-out ${
            isOpen ? "max-h-60 opacity-100 mt-2 p-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-2 text-sm bg-gray-100 p-4 rounded-md dark:bg-gray-800">
            <li>
              <NavLink
                onClick={() => setIsOpen(false)} // Fixed: changed from setIsOpen(null)
                className={activeLink}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={activeLink}
                to="/About"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={activeLink}
                to="/AllJobs"
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={activeLink}
                to="/AddJob"
              >
                Add Job
              </NavLink>
            </li>
            {!user && (
              <div className="flex items-center py-3 gap-4 justify-center justify-items-center flex-1 md:justify-end">
                <div className="sm:flex sm:gap-4">
                  <button
                    onClick={() => {
                      setModal("login");
                      setIsOpen(false); // Close mobile menu when opening modal
                    }}
                    type="button"
                    data-modal-target="authentication-modal"
                    className="login"
                  >
                    Login
                  </button>
                </div>
                <div className="sm:flex sm:gap-4">
                  <button
                    onClick={() => {
                      setModal("register");
                      setIsOpen(false); // Close mobile menu when opening modal
                    }}
                    type="button"
                    data-modal-target="authentication-modal"
                    className="register"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;