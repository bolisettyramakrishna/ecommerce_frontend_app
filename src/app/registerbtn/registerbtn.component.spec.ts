import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterbtnComponent } from './registerbtn.component';

describe('RegisterbtnComponent', () => {
  let component: RegisterbtnComponent;
  let fixture: ComponentFixture<RegisterbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
