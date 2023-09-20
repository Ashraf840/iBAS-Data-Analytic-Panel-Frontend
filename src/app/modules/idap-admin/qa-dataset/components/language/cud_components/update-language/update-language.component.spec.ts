import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLanguageComponent } from './update-language.component';

describe('UpdateLanguageComponent', () => {
  let component: UpdateLanguageComponent;
  let fixture: ComponentFixture<UpdateLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLanguageComponent]
    });
    fixture = TestBed.createComponent(UpdateLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
