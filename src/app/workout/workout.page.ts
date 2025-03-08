import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonTextarea,
} from '@ionic/angular/standalone';
import { ExerciseSelectorComponent } from '../components/exercise-selector/exercise-selector.component';
import { Exercise, repsWeight } from '../interfaces/exercises';
import { ExerciseStorageService } from '../services/exerciseStorage.service';
import { WorkoutStorageService } from '../services/workout-storage.service';
import { ExerciseLoggerComponent } from '../components/exercise-logger/exercise-logger.component';
import { previousWorkout, workout } from '../interfaces/workouts';
import { ActivatedRoute } from '@angular/router';
import { PreviousWorkoutStorageService } from '../services/previous-workout-storage.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonReorderGroup,
    IonSearchbar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonModal,
    IonButton,
    IonList,
    ExerciseSelectorComponent,
    ExerciseLoggerComponent,
  ],
})
export class WorkoutPage implements OnInit {
  constructor(
    private exerciseStorageService: ExerciseStorageService,
    private workoutStorageService: WorkoutStorageService,
    private previousWorkoutStorageService: PreviousWorkoutStorageService,
    private route: ActivatedRoute
  ) {}
  isSession: boolean = false;
  workoutId!: string;
  workout: { exerciseId: number; sets: number }[] = [];
  exercises: Exercise[] = [];
  exercisesOpen: boolean = false;
  presentingElement!: HTMLElement | null;
  results = [...this.exercises];
  workoutName: string = '';
  workoutNotes: string = '';
  checked: boolean = false;

  workoutSets: { repsWeight: repsWeight[] }[] = [];
  completedWorkout!: previousWorkout;

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.workout = event.detail.complete(this.workout);
  }

  handleSearchInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.exercises.filter((d) =>
      d.name.toLowerCase().includes(query)
    );
  }

  toggleExercises() {
    if (!this.exercisesOpen) {
      this.results = this.exercises.filter((d) =>
        d.name.toLowerCase().includes('')
      );
    }
    this.exercisesOpen = !this.exercisesOpen;
  }

  getExerciseDetails(exerciseId: number | undefined): number | null {
    const exercise = this.workout.find((e) => e.exerciseId === exerciseId);
    return exercise?.sets ?? null;
  }

  handleUpdate(data: { exercise: Exercise; flag: boolean }) {
    const index = this.workout.findIndex(
      (e) => e.exerciseId === data.exercise.id
    );

    if (data.flag) {
      if (index === -1 && data.exercise.id !== undefined) {
        this.workout = [
          ...this.workout,
          {
            exerciseId: data.exercise.id,
            sets: data.exercise.sets ?? 0,
          },
        ];
      } else if (index !== -1) {
        this.workout = this.workout.map((e, i) =>
          i === index ? { ...e, sets: data.exercise.sets ?? 0 } : e
        );
      }
    } else {
      if (index !== -1) {
        this.workout = [
          ...this.workout.slice(0, index),
          ...this.workout.slice(index + 1),
        ];
      }
    }
  }

  async handleSetsValues(data: {
    repsWeight: repsWeight[];
    exerciseId: number;
  }) {
    if (!this.workoutSets) {
      const exerciseCount = await this.exerciseStorageService.getCount();
      this.workoutSets = Array.from({ length: exerciseCount }, () => ({
        repsWeight: [],
      }));
    }

    if (!this.workoutSets[data.exerciseId]) {
      this.workoutSets[data.exerciseId] = { repsWeight: [] };
    }

    this.workoutSets[data.exerciseId].repsWeight = [...data.repsWeight];
  }
  async saveSession() {
    if (this.workout.length === 0) {
      console.warn('No exercises selected for workout.');
      return;
    }
    this.completedWorkout = {
      workoutId: Number(this.workoutId),
      name: this.workoutName,
      workoutSets: this.workoutSets,
      sessionDate: new Date(),
      setsOrder: this.workout,
    };
    if (this.route.snapshot.paramMap.get('isPrevious') == 'true') {
      const workout =
        await this.previousWorkoutStorageService.getPreviousWorkout(
          Number(this.workoutId)
        );
      this.previousWorkoutStorageService.updatePreviousWorkout(
        Number(workout?.id),
        this.completedWorkout
      );
    } else
      this.previousWorkoutStorageService.addPreviousWorkout(
        this.completedWorkout
      );
  }

  async saveWorkout(name: IonInput, notes: IonTextarea) {
    if (this.workout.length === 0) {
      console.warn('No exercises selected for workout.');
      return;
    }
    for (let exercise of this.workout) {
      exercise.sets = Number(exercise.sets);
    }

    const newWorkout: workout = {
      name: name.value?.toString() ?? '',
      lastSessionDate: new Date(),
      sessionCount: 0,
      notes: notes.value?.toString() ?? '',
      exercises: this.workout,
    };

    await this.workoutStorageService.addWorkout(newWorkout);
  }

  async ngOnInit() {
    this.workoutId = this.route.snapshot.paramMap.get('id')!;
    if (this.route.snapshot.paramMap.get('isPrevious') == 'true') {
      const workout =
        await this.previousWorkoutStorageService.getPreviousWorkout(
          Number(this.workoutId)
        );
      if (workout) {
        this.isSession = true;
        this.workout = workout.setsOrder;
        this.workoutName = workout.name;
        this.workoutSets = workout.workoutSets;
        this.workoutNotes = '';
      }
    } else {
      const workout = await this.workoutStorageService.getWorkout(
        Number(this.workoutId)
      );

      if (workout) {
        this.isSession = true;
        this.workout = workout?.exercises;
        this.workoutName = workout?.name;
        this.workoutNotes = workout?.notes;
      }
    }
    this.exercises = await this.exerciseStorageService.getExercises();
  }
}
