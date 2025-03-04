import { useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import Colors from "../components/Colors";
import Spinner from "../util/Spinner";
import useFetchAny from "../hooks/useFetchAny";
import toast from "react-hot-toast";

export default function DailyCommander() {
  const { fetchFunction, isLoading, error } = useFetchAny();
  const [commander, setCommander] = useState(null);
  const [life, setLife] = useState(4);
  const [score, setScore] = useState(0);
  const [typeField, setTypeField] = useState("");
  const [types, setTypes] = useState([]);
  const [correctTypes, setCorrectTypes] = useState([]);

  // Fetch daily commander only once on mount
  useEffect(() => {
    fetchEndlessCommander();
  }, []);

  // Set creature types from the commander data
  useEffect(() => {
    if (commander) {
      setTypes(commander.type_line || []);
    }
  }, [commander]);

  useEffect(() => {
    if (life < 1) {
      toast.error("Game Over!");
      fetchEndlessCommander();
      setLife(4);
      setScore(0);
    }
  }, [life]);

  const fetchEndlessCommander = () => {
    fetchFunction("/api/daily/endless").then(setCommander).catch(console.error);
  };

  const checkType = () => {
    if (!typeField) return;

    const guessedType = typeField.toLowerCase();
    setTypeField("");

    if (types.includes(guessedType)) {
      toast.success(`${guessedType} is correct!`);
      setCorrectTypes((prev) => [...prev, guessedType]);
      setTypes((prev) => prev.filter((type) => type !== guessedType));
      setScore((prev) => prev + 1);

      // If all types guessed correctly, mark as solved
      if (types.length === 1) {
        fetchEndlessCommander();
        setCorrectTypes([]);
        setLife((prev) => (prev < 4 ? prev + 1 : 4));
        toast.success("Commander Solved!");
      }
    } else {
      toast.error(`${guessedType} is incorrect!`);
      setLife((prev) => prev - 1);
    }
  };

  // Loading states
  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center mr-4 ml-4">
      <Card>
        <p className="text-2xl font-semibold text-primaryText mb-2 dark:text-darkPrimaryText">
          Endless Mode
        </p>
        <p className="text-secondaryText dark:text-darkSecondaryText mb-2">
          See how far you can get guessing creature types!
        </p>
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
        <p className="mt-2">Guess my types:</p>
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
          <div className="px-2 py-2 border text-primaryText dark:text-darkPrimaryText border-gray-300 dark:border-gray-700 rounded-lg w-fit">
            HP: {life} / 4
          </div>
          <div className="px-2 py-2 border text-primaryText dark:text-darkPrimaryText border-gray-300 dark:border-gray-700 rounded-lg w-fit">
            Types left: {types?.length}
          </div>
          <div className="px-2 py-2 border text-primaryText dark:text-darkPrimaryText border-gray-300 dark:border-gray-700 rounded-lg w-fit">
            Score: {score}
          </div>
        </div>
      </Card>
    </div>
  );
}
