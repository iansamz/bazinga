import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppljComponent } from './applj.component';

describe('AppljComponent', () => {
  let component: AppljComponent;
  let fixture: ComponentFixture<AppljComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppljComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
