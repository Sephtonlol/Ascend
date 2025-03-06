import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IonIcon, IonInput, IonReorder } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { reorderThreeOutline } from 'ionicons/icons';
import { Exercise } from 'src/app/interfaces/exercises';
import { exerciseDetails } from 'src/app/interfaces/workouts';
import { ExerciseStorageService } from 'src/app/services/exerciseStorage.service';

@Component({
  selector: 'app-exercise-logger',
  templateUrl: './exercise-logger.component.html',
  styleUrls: ['./exercise-logger.component.scss'],
  imports: [IonInput, IonReorder, IonIcon],
})
export class ExerciseLoggerComponent implements OnInit {
  constructor(private exerciseStorageService: ExerciseStorageService) {
    addIcons({ reorderThreeOutline });
  }
  @Input() exerciseInfo!: exerciseDetails;
  sets!: number[];
  exercise!: Exercise | undefined;

  async ngOnInit() {
    this.updateSets();
    this.exercise = await this.exerciseStorageService.getExercise(
      this.exerciseInfo.exerciseId
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exerciseInfo'] && !changes['exerciseInfo'].firstChange) {
      this.updateSets();
    }
  }

  private updateSets() {
    this.sets = Array.from(
      { length: this.exerciseInfo?.sets ?? 3 },
      (_, i) => i
    );
  }
}
