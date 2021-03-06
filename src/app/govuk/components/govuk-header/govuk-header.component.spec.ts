import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukHeaderComponent } from './govuk-header.component';

describe('GovukHeaderComponent', () => {
  let component: GovukHeaderComponent;
  let fixture: ComponentFixture<GovukHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
