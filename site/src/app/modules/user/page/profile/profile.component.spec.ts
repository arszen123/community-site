import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { ProfileService } from '../../service/profile.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    const profileService = {getProfile: () => new Observable(), getProfileById: (id) => new Observable()}; 
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: ProfileService, useValue: profileService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
