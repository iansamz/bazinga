import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAcceptComponent } from './dialog-accept.component';

describe('DialogAcceptComponent', () => {
  let component: DialogAcceptComponent;
  let fixture: ComponentFixture<DialogAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
