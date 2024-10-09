import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindetailsComponent } from './logindetails.component';

describe('LogindetailsComponent', () => {
  let component: LogindetailsComponent;
  let fixture: ComponentFixture<LogindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogindetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
