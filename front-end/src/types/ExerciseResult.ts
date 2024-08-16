import ExerciseSet from './ExerciseSet';

interface ExerciseResult {
  name: string;
  type: string;
  date: Date;
  sets: ExerciseSet[];
  result: {
    distance?: number;
    energy?: number;
  };
  duration: number;
}

export default ExerciseResult;
