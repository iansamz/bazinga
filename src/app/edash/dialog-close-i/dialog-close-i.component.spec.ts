import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloseIComponent } from './dialog-close-i.component';

describe('DialogCloseIComponent', () => {
  let component: DialogCloseIComponent;
  let fixture: ComponentFixture<DialogCloseIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCloseIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCloseIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
