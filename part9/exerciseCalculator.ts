type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export const calculateExercises = (
  objective: number,
  array: Array<number>
): Result => {
  const periodLength = array.length;
  const trainingDays = array.filter((number) => number !== 0).length;
  const sum = array.reduce(
    (previousValue, currentValue) =>
      Number(previousValue) + Number(currentValue),
    0
  );
  const average = Number(sum) / array.length;
  const success = average >= objective;
  const rating = success === true ? 3 : 1;
  const ratingDescription =
    success === true
      ? "very good, keep going"
      : "not too bad but could be better";

  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: objective,
    average: average,
  };

  return result;
};

const a = Number(process.argv[2]);
const b: number[] = process.argv.slice(3).map((numb) => Number(numb));

calculateExercises(a, b);