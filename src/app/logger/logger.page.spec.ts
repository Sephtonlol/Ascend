import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerPage } from './logger.page';

describe('LoggerPage', () => {
  let component: LoggerPage;
  let fixture: ComponentFixture<LoggerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
