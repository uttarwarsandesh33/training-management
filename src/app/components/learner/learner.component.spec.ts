import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerComponent } from './learner.component';

describe('LearnerComponent', () => {
  let component: LearnerComponent;
  let fixture: ComponentFixture<LearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
