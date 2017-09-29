import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddijComponent } from './addij.component';

describe('AddijComponent', () => {
  let component: AddijComponent;
  let fixture: ComponentFixture<AddijComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddijComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
