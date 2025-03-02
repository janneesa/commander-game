import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

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
        <Link className="button" to="/">
          Game
        </Link>
        {user ? (
          <button className="button-secondary" onClick={logout}>
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
                onClick={logout}
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
