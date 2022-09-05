import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterationComponent } from './auth-registeration.component';

describe('AuthRegisterationComponent', () => {
  let component: AuthRegisterationComponent;
  let fixture: ComponentFixture<AuthRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
