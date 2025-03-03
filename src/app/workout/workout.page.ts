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
} from '@ionic/angular/standalone';
import { ExerciseSelectorComponent } from '../components/exercise-selector/exercise-selector.component';
import { Exercise } from '../interfaces/exercises';
import { ExerciseStorageService } from '../services/exerciseStorage.service';
import { ExerciseLoggerComponent } from '../components/exercise-logger/exercise-logger.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [
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
  constructor(private exerciseStorageService: ExerciseStorageService) {}
  workout: Exercise[] = [];
  exercises: Exercise[] = [];
  exercisesOpen: boolean = false;
  presentingElement!: HTMLElement | null;
  results = [...this.exercises];
  checked: boolean = false;

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

  getExerciseDetails(exerciseName: string): number | null {
    const exercise = this.workout.find((e) => e.name === exerciseName);
    return exercise?.sets ?? null;
  }

  handleUpdate(data: { exercise: Exercise; flag: boolean }) {
    const index = this.workout.findIndex((e) => e.name === data.exercise.name);
    if (data.flag) {
      if (index === -1) {
        this.workout.push({ ...data.exercise });
        console.log('Added:', data.exercise.name);
      } else {
        this.workout[index] = {
          ...this.workout[index],
          sets: data.exercise.sets,
        };
        console.log('Updated sets for:', data.exercise.name);
      }
    } else {
      if (index !== -1) {
        this.workout.splice(index, 1);
        console.log('Removed:', data.exercise.name);
      }
    }

    console.log('Current workout:', this.workout);
  }

  async ngOnInit() {
    this.exercises = await this.exerciseStorageService.getExercises();
  }
}
