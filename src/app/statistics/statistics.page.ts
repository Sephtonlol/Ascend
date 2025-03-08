import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PreviousWorkoutStorageService } from '../services/previous-workout-storage.service';
import { previousWorkout } from '../interfaces/workouts';
import { WorkoutCardComponent } from '../components/workout-card/workout-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    WorkoutCardComponent,
    RouterLink,
  ],
})
export class StatisticsPage implements OnInit {
  constructor(
    private previousWorkoutStorageService: PreviousWorkoutStorageService
  ) {}
  previousWorkouts: previousWorkout[] = [];

  async ngOnInit() {
    this.previousWorkouts =
      await this.previousWorkoutStorageService.getPreviousWorkouts();
  }
}
