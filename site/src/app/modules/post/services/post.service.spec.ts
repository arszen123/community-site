import { TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService, GQL_QUERY_POSTS, GQL_QUERY_POST_BY_ID } from './post.service';
import { environment } from 'src/environments/environment';

describe('PostService', () => {
  let service: PostService;
  let apolloController: ApolloTestingController;
  let httpController: HttpTestingController;
  let _createPost: (id: any) => {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    apolloController = TestBed.inject(ApolloTestingController);
    httpController = TestBed.inject(HttpTestingController);
    _createPost = (id) => ({id, title: 'Test', numberOfComments: 0, createdAt: new Date()})
  });

  afterEach(() => {
    apolloController.verify();
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPosts should return posts', async function () {
    const posts = [
      _createPost("1"),
      _createPost("2"),
    ];
    service.getPosts().subscribe(res => {
      expect(res).toEqual(posts);
    });

    const op = apolloController.expectOne(GQL_QUERY_POSTS);
    op.flush({
      data: { posts }
    });
  });

  it('findById should return post by id', async function () {
    const posts = [
      _createPost("1"),
      _createPost("2"),
    ];
    service.findById("1").subscribe(res => {
      expect(res).toEqual(posts[0]);
    });
    service.findById("2").subscribe(res => {
      expect(res).toEqual(posts[1]);
    });

    const requests = apolloController.match(GQL_QUERY_POST_BY_ID);
    expect(requests.length).toEqual(2);
    requests.forEach((op, index) => {
      expect(op.operation.variables.id).toBeDefined();
      op.flush({ data: {post: posts[index]}});
    })
  });

  it('create post should refresh posts', async function () {
    const posts = [
      _createPost("1"),
      _createPost("2"),
    ];
    const newPost = {title: 'Test post', description: 'Test post description'};

    service.getPosts().subscribe(res => {
      if (res.length === 2) {
        expect(res).toEqual(posts);
      } else if (res.length === 3) {
        expect(res).toEqual([...posts, newPost]);
      } else {
        fail('Incorrect posts length.');
      }
    });

    const op = apolloController.expectOne(GQL_QUERY_POSTS);
    service.create(newPost).subscribe(res => {
      expect((res as any).success).toEqual(true);
      (newPost as any).id = '3';
      op.flush({
        data: { posts: [...posts, newPost] }
      });
    });

    const httpRequest = httpController.expectOne(environment.api + '/posts');
    httpRequest.flush({success: true});
    op.flush({
      data: { posts }
    });

  });

  it('addComment should add a new comment and refresh the queried post', async function() {
    const post = _createPost("1");

    service.findById("1").subscribe(res => {
      expect(res).toEqual(post);
    });

    const op = apolloController.expectOne(GQL_QUERY_POST_BY_ID);
    const commentText = 'My Comment';
    service.addComment("1", commentText).subscribe(res => {
      expect((res as any).success).toEqual(true);
      (post as any).comments = [{id: "1", text: commentText}];
      op.flush({ data: {post: post}});
    });

    const httpRequest = httpController.expectOne(environment.api + '/posts/1/comments');
    httpRequest.flush({success: true});
    expect(op.operation.variables.id).toBeDefined();
    op.flush({ data: {post: post}});
  });
  it('voteComment should vote an existing comment, and refresh the queried post', async function() {
    const post = _createPost("1");
    (post as any).comments = [{id: "1", text: 'My Comment'}];

    service.findById("1").subscribe(res => {
      expect(res).toEqual(post);
    });

    const op = apolloController.expectOne(GQL_QUERY_POST_BY_ID);
    service.voteComment("1", "1", true).subscribe(res => {
      expect((res as any).success).toEqual(true);
      op.flush({ data: {post: post}});
    });

    const httpRequest = httpController.expectOne(environment.api + '/posts/1/comments/1/vote/true');
    httpRequest.flush({success: true});
    expect(op.operation.variables.id).toBeDefined();
    op.flush({ data: {post: post}});
  });
});
