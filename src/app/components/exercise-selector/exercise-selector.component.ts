import { Component, Input, OnInit } from '@angular/core';
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
  ],
})
export class ExerciseSelectorComponent implements OnInit {
  constructor() {}
  @Input() exercise!: Exercise;

  iterations = Array.from({ length: 10 }, (_, i) => i);
  setsModal = false;
  setsAmount = '3';

  toggleModal() {
    this.setsModal = !this.setsModal;
  }

  onIonChange(event: CustomEvent) {
    this.setsAmount = event.detail.value;
  }

  ngOnInit() {}
}
