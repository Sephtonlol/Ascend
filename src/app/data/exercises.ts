import { Exercise } from '../interfaces/exercises';

export const exercises: Exercise[] = [
  { name: 'Bicep Curls', targetMuscle: 'Biceps', type: 'Isolation' },
  { name: 'Tricep Dips', targetMuscle: 'Triceps', type: 'Compound' },
  { name: 'Squats', targetMuscle: 'Quadriceps', type: 'Compound' },
  { name: 'Deadlifts', targetMuscle: 'Hamstrings', type: 'Compound' },
  { name: 'Bench Press', targetMuscle: 'Chest', type: 'Compound' },
  { name: 'Pull-Ups', targetMuscle: 'Back', type: 'Compound' },
  { name: 'Lateral Raises', targetMuscle: 'Side Delt', type: 'Isolation' },
  { name: 'Wrist Curls', targetMuscle: 'Forearms', type: 'Isolation' },
  { name: 'Calf Raises', targetMuscle: 'Calves', type: 'Isolation' },
  { name: 'Neck Flexion', targetMuscle: 'Neck', type: 'Isolation' },
];
