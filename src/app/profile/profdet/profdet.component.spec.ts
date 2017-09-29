import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfdetComponent } from './profdet.component';

describe('ProfdetComponent', () => {
  let component: ProfdetComponent;
  let fixture: ComponentFixture<ProfdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
