import Card from "./Card";

export default function ResultCard({ solved }) {
  return (
    <div className="flex justify-center items-center animate-scaleIn pr-4 pl-4">
      <Card>
        {solved ? (
          <>
            <h2 className="text-2xl text-center font-bold text-green-500">
              Victory!
            </h2>
            <p className="text-lg text-center text-primaryText dark:text-darkPrimaryText mt-2">
              You correctly guessed today’s commander!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl text-center font-bold text-red-500">
              Try Again Tomorrow
            </h2>
            <p className="text-lg text-center text-primaryText dark:text-darkPrimaryText mt-2">
              You ran out of guesses for today.
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
