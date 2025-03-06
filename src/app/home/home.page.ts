import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  NavController,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ExerciseStorageService } from '../services/exerciseStorage.service';
import { WorkoutStorageService } from '../services/workout-storage.service';
import { workout } from '../interfaces/workouts';
import { WorkoutCardComponent } from '../components/workout-card/workout-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonContent,
    WorkoutCardComponent,
  ],
})
export class HomePage implements OnInit {
  constructor(
    private navController: NavController,
    private exerciseStorageService: ExerciseStorageService,
    private workoutStorageService: WorkoutStorageService
  ) {
    addIcons({ add });
  }
  workouts!: workout[];

  goToWorkout() {
    this.navController.navigateForward('/workout');
  }
  async ngOnInit(): Promise<void> {
    if ((await this.exerciseStorageService.getCount()) <= 0) {
      await this.exerciseStorageService.addDefaultExercises();
    }
    this.workouts = await this.workoutStorageService.getWorkouts();
  }
}
