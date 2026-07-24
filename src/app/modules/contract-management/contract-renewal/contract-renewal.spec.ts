import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ContractRenewal } from "./contract-renewal";

describe("ContractRenewal", () => {
  let component: ContractRenewal;
  let fixture: ComponentFixture<ContractRenewal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractRenewal],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractRenewal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
