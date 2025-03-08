import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercises';
import { previousWorkout, workout } from 'src/app/interfaces/workouts';

import { ExerciseStorageService } from 'src/app/services/exerciseStorage.service';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent implements OnInit {
  constructor(private exerciseStorageService: ExerciseStorageService) {}
  @Input() workout!: workout;
  @Input() previousWorkout!: previousWorkout;
  exercises: Exercise[] = [];
  musclesWorked: string[] = [];

  async ngOnInit() {
    if (this.previousWorkout) {
      this.workout = {
        name: this.previousWorkout.name,
        notes: '',
        lastSessionDate: this.previousWorkout.sessionDate,
        exercises: this.previousWorkout.setsOrder,
        sessionCount: 1,
      };
    }
    for (let exercise of this.workout.exercises) {
      const fetchedExercise = await this.exerciseStorageService.getExercise(
        exercise.exerciseId
      );
      if (
        !fetchedExercise ||
        this.musclesWorked.includes(fetchedExercise.targetMuscle)
      )
        return;
      this.exercises = [
        ...this.exercises,
        { ...fetchedExercise, sets: exercise.sets },
      ];
      this.musclesWorked = [
        ...this.musclesWorked,
        fetchedExercise.targetMuscle,
      ];
    }
  }
}
