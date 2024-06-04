import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecipesComponent } from './dashboard-recipes.component';

describe('DashboardRecipesComponent', () => {
  let component: DashboardRecipesComponent;
  let fixture: ComponentFixture<DashboardRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRecipesComponent]
    });
    fixture = TestBed.createComponent(DashboardRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
