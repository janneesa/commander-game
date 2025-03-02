import { useContext, useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import Colors from "../components/Colors";
import Spinner from "../util/Spinner";
import useFetchAny from "../hooks/useFetchAny";
import ResultCard from "../components/ResultCard";
import { UserContext } from "../context/UserContext";

export default function DailyCommander() {
  const { user, update, loading } = useContext(UserContext);
  const { fetchFunction, isLoading, error } = useFetchAny();
  const [commander, setCommander] = useState(null);
  const [typeField, setTypeField] = useState("");
  const [types, setTypes] = useState([]);
  const [correctTypes, setCorrectTypes] = useState([]);

  // Fetch daily commander only once on mount
  useEffect(() => {
    fetchFunction("/api/daily").then(setCommander).catch(console.error);
  }, []);

  // Set creature types from the commander data
  useEffect(() => {
    if (commander) {
      setTypes(commander.type_line || []);
    }
  }, [commander]);

  // Update user data in the database
  const updateUserData = useCallback(
    (updatedUser) => {
      fetchFunction(`/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedUser),
      }).catch(console.error);
    },
    [user, fetchFunction]
  );

  // Handle type guess
  const checkType = () => {
    const guessedType = typeField.toLowerCase();
    setTypeField("");

    if (types.includes(guessedType)) {
      console.log("Correct!");
      setCorrectTypes((prev) => [...prev, guessedType]);
      setTypes((prev) => prev.filter((type) => type !== guessedType));

      // If all types guessed correctly, mark as solved
      if (types.length === 1) {
        const updatedUser = { ...user, solved: true };
        update(updatedUser);
        updateUserData(updatedUser);
      }
    } else {
      console.log("Incorrect!");
      if (user.life > 1) {
        const updatedUser = { ...user, life: user.life - 1 };
        update(updatedUser);
        updateUserData(updatedUser);
      } else {
        // If life reaches 0, mark as failed
        const updatedUser = { ...user, life: 0, solved: false };
        update(updatedUser);
        updateUserData(updatedUser);
      }
    }
  };

  // Loading states
  if (isLoading || loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  // Show failure message if the user has lost
  if (user.life === 0 && user.solved === false) {
    return <ResultCard solved={false} />;
  }

  // Show victory message if the user has won
  if (user.solved) {
    return <ResultCard solved={true} />;
  }

  return (
    <div className="flex flex-col items-center mr-4 ml-4">
      <Card>
        <div className="flex flex-row justify-between items-center">
          <p className="text-primaryText dark:text-darkPrimaryText text-lg">
            {commander?.name}
          </p>
          <Colors colors={commander?.colors} />
        </div>
        <div className="mt-4 rounded-lg overflow-hidden">
          <img src={commander?.image} alt={commander?.name} />
        </div>
        <div className="mt-4 flex flex-row">
          <p className="text-lg text-secondaryText dark:text-darkSecondaryText">
            {commander?.card_type} -{" "}
            {correctTypes.length > 0 && correctTypes.join(", ")}
          </p>
        </div>
        <div className="mt-4 flex flex-row space-x-4">
          <input
            type="text"
            value={typeField}
            onChange={(e) => setTypeField(e.target.value)}
          />
          <button onClick={checkType} className="button-check">
            Check
          </button>
        </div>
        <div className="mt-4 flex flex-row space-x-4">
          <div className="px-2 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-fit">
            HP: {user?.life} / 4
          </div>
          <div className="px-2 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-fit">
            Types left: {types?.length}
          </div>
        </div>
      </Card>
    </div>
  );
}
