import Card from "./Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function ResultCard({ solved }) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center animate-scaleIn pr-4 pl-4">
      <Card>
        {solved ? (
          <>
            <h2 className="text-2xl text-center font-bold text-green-500 dark:text-green-400">
              Victory!
            </h2>
            <p className="text-lg text-center text-primaryText dark:text-darkPrimaryText mt-2">
              You correctly guessed today’s commander!
            </p>
            <h3 className="text-lg mt-2 text-center text-primaryText dark:text-darkPrimaryText">
              Your current score is: {user?.highscore}
            </h3>
            <div className="text-center mx-auto mt-2">
              <Link className="text-blue-600" to="/endless">
                Try out endless mode in the meantime
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl text-center font-bold text-red-500 dark:text-red-400">
              Try Again Tomorrow
            </h2>
            <p className="text-lg text-center text-primaryText dark:text-darkPrimaryText mt-2">
              You ran out of guesses for today.
            </p>
            <h3 className="text-lg mt-2 text-center text-primaryText dark:text-darkPrimaryText">
              Your current score is: {user?.highscore}
            </h3>
            <div className="text-center mx-auto mt-2">
              <Link className="text-blue-600" to="/endless">
                Try out endless mode in the meantime
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
