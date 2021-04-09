import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { fixObservableSubclass } from '@apollo/client/utilities';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { PostService } from '../../services/post.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    const postService = {findById: (id) => new Observable()};
    const authService = { isAuthenticated: () => false};
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{provide: PostService, useValue: postService}, {provide: AuthService, useValue: authService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
