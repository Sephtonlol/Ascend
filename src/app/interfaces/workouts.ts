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
  reps?: number;
  weight?: number;
}
