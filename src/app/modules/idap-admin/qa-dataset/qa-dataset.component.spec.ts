import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaDatasetComponent } from './qa-dataset.component';

describe('QaDatasetComponent', () => {
  let component: QaDatasetComponent;
  let fixture: ComponentFixture<QaDatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QaDatasetComponent]
    });
    fixture = TestBed.createComponent(QaDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
