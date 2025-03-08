import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { previousWorkout } from '../interfaces/workouts';

@Injectable({
  providedIn: 'root',
})
export class PreviousWorkoutStorageService extends Dexie {
  previousWorkouts!: Table<previousWorkout, number>;

  constructor() {
    super('Ascend');
    this.version(1).stores({
      previousWorkouts: '++id, name, workoutSets, setsOrder, sessionDate',
    });
  }

  async getCount(): Promise<number> {
    return await this.previousWorkouts.count();
  }

  async addPreviousWorkout(data: Omit<previousWorkout, 'id'>) {
    return await this.previousWorkouts.add(data);
  }

  async getPreviousWorkouts(): Promise<previousWorkout[]> {
    return await this.previousWorkouts.toArray();
  }

  async getPreviousWorkout(id: number): Promise<previousWorkout | undefined> {
    return await this.previousWorkouts.get(id);
  }

  async updatePreviousWorkout(id: number, data: Partial<previousWorkout>) {
    return await this.previousWorkouts.update(id, data);
  }

  async deletePreviousWorkout(id: number): Promise<void> {
    await this.previousWorkouts.delete(id);
  }

  async getPreviousWorkoutsCount(): Promise<number> {
    return await this.previousWorkouts.count();
  }
}
