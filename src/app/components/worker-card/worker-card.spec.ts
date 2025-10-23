import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCard } from './worker-card';

describe('WorkerCard', () => {
  let component: WorkerCard;
  let fixture: ComponentFixture<WorkerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
