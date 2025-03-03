import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonModal,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
} from '@ionic/angular/standalone';
import { Exercise } from 'src/app/interfaces/exercises';

@Component({
  selector: 'app-exercise-selector',
  templateUrl: './exercise-selector.component.html',
  styleUrls: ['./exercise-selector.component.scss'],
  imports: [
    IonCheckbox,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonButton,
    IonModal,
    FormsModule,
  ],
})
export class ExerciseSelectorComponent implements OnInit {
  constructor() {}
  @Input() exercise!: Exercise;
  @Input() sets: number | null = null;
  @Input() checked: boolean = false;

  @Output() updateWorkout = new EventEmitter<{
    exercise: Exercise;
    flag: boolean;
  }>();

  iterations = Array.from({ length: 69 }, (_, i) => i);
  setsModal = false;

  toggleModal() {
    this.setsModal = !this.setsModal;
  }

  onChangeSets(event: CustomEvent) {
    this.exercise.sets = event.detail.value;
    if (!this.checked) {
      return;
    }
    this.updateWorkout.emit({ exercise: this.exercise, flag: true });
  }

  onChangeChecked(event: CustomEvent) {
    this.checked = event.detail.checked;
    this.updateWorkout.emit({
      exercise: this.exercise,
      flag: this.checked,
    });
  }

  ngOnInit() {
    if (this.sets) {
      this.exercise.sets = this.sets;
      this.checked = true;
    } else {
      this.exercise.sets = 3;
    }
  }
}
