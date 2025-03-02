import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Exercise } from '../interfaces/exercises';
import { exercises } from '../data/exercises';

@Injectable({
  providedIn: 'root',
})
export class ExerciseStorageService extends Dexie {
  exercises!: Table<Exercise, number>;

  constructor() {
    super('Ascend');
    this.version(1).stores({
      exercises: '++id, exercise, targetMuscle, type',
    });
  }

  async addDefaultExercises() {
    for (let i of exercises) {
      await this.exercises.add(i);
    }
  }

  async getCount(): Promise<number> {
    return await this.exercises.count();
  }

  async addExercise(data: Omit<Exercise, 'id'>) {
    return await this.exercises.add(data); // Dexie will only store the provided fields
  }

  async getExercises(): Promise<Exercise[]> {
    return await this.exercises.toArray();
  }

  async deleteExercise(id: number) {
    return await this.exercises.delete(id);
  }
}
