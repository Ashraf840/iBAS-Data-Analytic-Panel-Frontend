import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionAnswerComponent } from './new-question-answer.component';

describe('NewQuestionAnswerComponent', () => {
  let component: NewQuestionAnswerComponent;
  let fixture: ComponentFixture<NewQuestionAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewQuestionAnswerComponent]
    });
    fixture = TestBed.createComponent(NewQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
