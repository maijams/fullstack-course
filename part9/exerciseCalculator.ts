type Rating = 1 | 2 | 3;

interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  exerciseHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const exerciseHours = args.slice(3).map(hours => Number(hours));

  if (isNaN(target)) {
    throw new Error('Target is not a number!');
  } else if (exerciseHours.some(hours => isNaN(hours))) {
    throw new Error('Some of the provided exercise hours are not numbers!');
  } else {
    return {
      exerciseHours,
      target
    };
  }
};

const calculateExercises = (exerciseHours: number[], target: number): ExerciseValues => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average > target / 2 ? 2 : 1;
  const ratingDescription = success ? 'well done!' : average > target / 2 ? 'not too bad but could be better' : 'try harded next time';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}