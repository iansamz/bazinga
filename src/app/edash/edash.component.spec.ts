import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdashComponent } from './edash.component';

describe('EdashComponent', () => {
  let component: EdashComponent;
  let fixture: ComponentFixture<EdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
