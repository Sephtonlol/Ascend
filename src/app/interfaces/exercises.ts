export interface Exercise {
  id?: number;
  name: string;
  targetMuscle:
    | 'Neck'
    | 'Biceps'
    | 'Forearms'
    | 'Triceps'
    | 'Hamstrings'
    | 'Side Delt'
    | 'Front Delt'
    | 'Rear Delt'
    | 'Chest'
    | 'Back'
    | 'Quadriceps'
    | 'Calves'
    | 'Core';
  type: 'Compound' | 'Isolation' | 'Isometric';
  sets?: number;
  reps?: number[];
  weight?: number[];
}
