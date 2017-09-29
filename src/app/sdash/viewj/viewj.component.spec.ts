import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjComponent } from './viewj.component';

describe('ViewjComponent', () => {
  let component: ViewjComponent;
  let fixture: ComponentFixture<ViewjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
