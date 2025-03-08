import { repsWeight } from './exercises';

export interface workout {
  id?: number;
  name: string;
  exercises: exerciseDetails[];
  notes: string;
  lastSessionDate: Date;
  sessionCount: number;
}

export interface exerciseDetails {
  exerciseId: number;
  sets: number;
}

export interface previousWorkout {
  id?: number;
  workoutId: number;
  name: string;
  workoutSets: { repsWeight: repsWeight[] }[];
  setsOrder: exerciseDetails[];
  sessionDate: Date;
}
