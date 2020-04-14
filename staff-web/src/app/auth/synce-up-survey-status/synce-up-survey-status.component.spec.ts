import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SynceUpSurveyStatusComponent } from "./synce-up-survey-status.component";

describe("SynceUpSurveyStatusComponent", () => {
  let component: SynceUpSurveyStatusComponent;
  let fixture: ComponentFixture<SynceUpSurveyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SynceUpSurveyStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynceUpSurveyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
