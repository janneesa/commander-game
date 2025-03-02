import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ModeContext } from "../context/ModeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ModeContext);
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const handleModeChange = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <nav>
      <Link
        to="/"
        className="text-primaryText dark:text-darkPrimaryText font-semibold text-lg px-4"
      >
        Commander Game
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4 text-secondaryText dark:text-darkSecondaryText">
        {/* Toggle Switch Start */}
        <div className="flex items-center space-x-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={handleModeChange}
            />
            <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600" />
          </label>
          <div className="text-primaryText dark:text-darkPrimaryText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </div>
        {/* Toggle Switch End */}
        <Link className="button" to="/">
          Game
        </Link>
        {user ? (
          <button className="button-secondary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="button-secondary" to="/login">
              Login
            </Link>
            <Link className="button-secondary" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-primaryText dark:text-darkPrimaryText focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-14 right-4 bg-background dark:bg-darkBackground shadow-lg rounded-lg w-40 p-3 md:hidden flex flex-col">
          {/* Toggle Switch Start */}
          <div className="flex py-2 px-2 space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={handleModeChange}
              />
              <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600" />
            </label>
            <div className="text-primaryText dark:text-darkPrimaryText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
          {/* Toggle Switch End */}
          <Link
            className="py-2 px-3 text-primaryText dark:text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Game
          </Link>
          {user ? (
            <>
              <button
                className="py-2 px-3 text-primaryText dark:text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-start"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="py-2 px-3 text-primaryText dark:text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                className="py-2 px-3 text-primaryText dark:text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                to="/signup"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
