import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojComponent } from './createproj.component';

describe('CreateprojComponent', () => {
  let component: CreateprojComponent;
  let fixture: ComponentFixture<CreateprojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
