import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonIcon, IonInput, IonReorder } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { reorderThreeOutline } from 'ionicons/icons';
import { Exercise, repsWeight } from 'src/app/interfaces/exercises';
import { exerciseDetails } from 'src/app/interfaces/workouts';
import { ExerciseStorageService } from 'src/app/services/exerciseStorage.service';

@Component({
  selector: 'app-exercise-logger',
  templateUrl: './exercise-logger.component.html',
  styleUrls: ['./exercise-logger.component.scss'],
  imports: [IonInput, IonReorder, IonIcon],
})
export class ExerciseLoggerComponent implements OnInit {
  constructor(
    private exerciseStorageService: ExerciseStorageService,
    private route: ActivatedRoute
  ) {
    addIcons({ reorderThreeOutline });
  }
  @Output() updateSetsValues = new EventEmitter<{
    repsWeight: repsWeight[];
    exerciseId: number;
  }>();
  @Input() exerciseInfo!: exerciseDetails;
  @Input() previousSets!: { repsWeight: repsWeight[] }[];
  sets!: number[];
  setsDetails: repsWeight[] = [];
  exercise!: Exercise | undefined;

  async ngOnInit() {
    if (this.route.snapshot.paramMap.get('isPrevious') == 'true') {
      if (
        this.previousSets &&
        this.previousSets[this.exerciseInfo.exerciseId]
      ) {
        this.setsDetails =
          this.previousSets[this.exerciseInfo.exerciseId].repsWeight;
      }
    }
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
  updateInputField(event: CustomEvent, field: string, index: number) {
    const value = event.detail.value;

    if (field === 'weight') {
      this.setsDetails[index].weight = value;
    } else if (field === 'reps') {
      this.setsDetails[index].reps = value;
    } else if (field === 'rir') {
      this.setsDetails[index].rir = value;
    }
    this.updateSetsValues.emit({
      repsWeight: this.setsDetails,
      exerciseId: this.exercise?.id ?? 0,
    });
  }

  private updateSets() {
    const newLength = this.exerciseInfo?.sets ?? 3;

    while (this.setsDetails.length < newLength) {
      this.setsDetails.push({ weight: -1, reps: -1, rir: -1 });
    }

    this.setsDetails = this.setsDetails.slice(0, newLength);

    this.sets = Array.from({ length: newLength }, (_, i) => i);
  }
}
