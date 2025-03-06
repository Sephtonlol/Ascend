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
    return await this.exercises.add(data);
  }

  async getExercises(): Promise<Exercise[]> {
    return await this.exercises.toArray();
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return await this.exercises.get(id);
  }

  async deleteExercise(id: number) {
    return await this.exercises.delete(id);
  }

  async updateWorkout(id: number, data: Partial<Exercise>) {
    return await this.exercises.update(id, data);
  }
}
