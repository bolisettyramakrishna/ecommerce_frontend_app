import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterSearchComponent } from './admin-filter-search.component';

describe('AdminFilterSearchComponent', () => {
  let component: AdminFilterSearchComponent;
  let fixture: ComponentFixture<AdminFilterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFilterSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
