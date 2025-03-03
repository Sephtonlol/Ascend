import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercises';

@Component({
  selector: 'app-exercise-logger',
  templateUrl: './exercise-logger.component.html',
  styleUrls: ['./exercise-logger.component.scss'],
})
export class ExerciseLoggerComponent implements OnInit {
  @Input() exercise!: Exercise;
  sets!: number[];

  ngOnInit() {
    this.updateSets();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exercise'] && !changes['exercise'].firstChange) {
      this.updateSets();
    }
  }

  private updateSets() {
    this.sets = Array.from({ length: this.exercise.sets ?? 3 }, (_, i) => i);
    console.log('Updated sets:', this.sets);
  }
}
