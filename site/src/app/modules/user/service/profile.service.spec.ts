import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { GQL_QUERY_ME, GQL_QUERY_PROFILE, ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    });
    service = TestBed.inject(ProfileService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfile should return Profile object', async function () {
    const user = {
      id: 1,
      username: "testuser",
      posts: []
    }
    service.getProfile().subscribe(res => {
      expect(res).toEqual(user);
    });
    const op = controller.expectOne(GQL_QUERY_ME);
    op.flush({data: {me: user}});
  });

  it('getProfileById should return Profile by id', async function () {
    const users = [{
      id: "1",
      username: "testuser",
      posts: []
    },{
      id: "2",
      username: "testuser",
      posts: []
    }]
    service.getProfileById("1").subscribe(res => {
      expect(res).toEqual(users[0]);
    });
    service.getProfileById("2").subscribe(res => {
      expect(res).toEqual(users[1]);
    });
    const requests = controller.match(GQL_QUERY_PROFILE);
    expect(requests.length).toEqual(2);
    requests.forEach((op, index) => {
      expect(op.operation.variables.id).toBeDefined();
      op.flush({data: {user: users[index]}});
    });
  });
});
