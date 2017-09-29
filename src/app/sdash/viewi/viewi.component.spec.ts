import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewiComponent } from './viewi.component';

describe('ViewiComponent', () => {
  let component: ViewiComponent;
  let fixture: ComponentFixture<ViewiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
