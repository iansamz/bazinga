import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdashComponent } from './adash.component';

describe('AdashComponent', () => {
  let component: AdashComponent;
  let fixture: ComponentFixture<AdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
