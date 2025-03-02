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
  ],
})
export class HomePage implements OnInit {
  constructor(
    private navController: NavController,
    private exerciseStorageService: ExerciseStorageService
  ) {
    addIcons({ add });
  }

  goToWorkout() {
    this.navController.navigateForward('/workout');
  }
  async ngOnInit(): Promise<void> {
    if ((await this.exerciseStorageService.getCount()) <= 0) {
      await this.exerciseStorageService.addDefaultExercises();
    }
  }
}
