import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyjComponent } from './applyj.component';

describe('ApplyjComponent', () => {
  let component: ApplyjComponent;
  let fixture: ComponentFixture<ApplyjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
