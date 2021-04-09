import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("authenticate method should set token after sucess authentication", async function () {
    const credentials = {username: "testuser", password: "password"};
    const accessToken = 'userAccessToken';
    service.authenticate(credentials).subscribe(() => {
      expect(service.getToken()).toEqual(accessToken);
      expect(service.isAuthenticated()).toEqual(true);
    })

    const req = controller.expectOne(environment.api + '/auth/sign-in');
    expect(req.request.body).toEqual(credentials);
    req.flush({
      access_token: accessToken,
    })
  });

  it("signUp method should set token after sucess user creation", async function () {
    const credentials = {username: "testuser", password: "password"};
    const accessToken = 'userAccessToken';
    service.signUp(credentials).subscribe(() => {
      expect(service.getToken()).toEqual(accessToken);
      expect(service.isAuthenticated()).toEqual(true);
    })

    const req = controller.expectOne(environment.api + '/auth/sign-up');
    expect(req.request.body).toEqual(credentials);
    req.flush({
      access_token: accessToken,
    })
  });

  it("logout should remove token", async function () {
    const credentials = {username: "testuser", password: "password"};
    const accessToken = 'userAccessToken';
    service.authenticate(credentials).subscribe(() => {
      expect(service.getToken()).toEqual(accessToken);
      expect(service.isAuthenticated()).toEqual(true);
      service.logout();
      expect(service.getToken()).toEqual(null);
      expect(service.isAuthenticated()).toEqual(false);
    })

    const req = controller.expectOne(environment.api + '/auth/sign-in');
    expect(req.request.body).toEqual(credentials);
    req.flush({
      access_token: accessToken,
    })
  });
});
