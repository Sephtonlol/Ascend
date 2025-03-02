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
} from '@ionic/angular/standalone';
import { ExerciseSelectorComponent } from '../components/exercise-selector/exercise-selector.component';
import { Exercise } from '../interfaces/exercises';
import { ExerciseStorageService } from '../services/exerciseStorage.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class WorkoutPage implements OnInit {
  constructor(private exerciseStorageService: ExerciseStorageService) {}
  exercises!: Exercise[];
  presentingElement!: HTMLElement | null;

  async ngOnInit() {
    this.exercises = await this.exerciseStorageService.getExercises();
  }
}
