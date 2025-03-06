import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { workout } from '../interfaces/workouts';

@Injectable({
  providedIn: 'root',
})
export class WorkoutStorageService extends Dexie {
  workouts!: Table<workout, number>;

  constructor() {
    super('Ascend');
    this.version(1).stores({
      workouts: '++id, name, lastSessionDate, sessionCount, tags, exercises',
    });
  }

  async getCount(): Promise<number> {
    return await this.workouts.count();
  }

  async addWorkout(data: Omit<workout, 'id'>) {
    return await this.workouts.add(data);
  }

  async getWorkouts(): Promise<workout[]> {
    return await this.workouts.toArray();
  }

  async getWorkout(id: number): Promise<workout | undefined> {
    return await this.workouts.get(id);
  }

  async updateWorkout(id: number, data: Partial<workout>) {
    return await this.workouts.update(id, data);
  }
}
