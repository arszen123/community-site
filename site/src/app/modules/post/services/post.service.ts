import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

type User = {
  id: string,
  username: string,
};
export type Comment = {
  text: string,
  user: User,
  createdAt: Date,
}
export type ListPost = { id: string, title: string}
export type Post = ListPost & {
  description: string,
  comments: Comment[],
  user: User,
  createdAt: Date,
}
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    ) { }

  getPosts() {
    return this.apollo.query<ListPost[]>({
      query: gql`query {
        posts {
          id
          title
        }
      }`
    }).pipe(map(res => (res.data as any).posts));
  }

  findById(id: string) {
    return this.apollo.query<Post>({
      query: gql`query ($id: ID!) {
        post(id: $id) {
          id
          title
          description
          createdAt
          user {
            username
          }
          comments {
            text
            createdAt
            user {
              username
            }
          }
        }
      }`,
      variables: {
        id,
      }
    }).pipe(map(res => (res.data as any).post));
  }

  create(post: {title: string, description: string}) {
    return this.http.post(environment.api + '/posts', post);
  }

  addComment(postId: string, text: string) {
    return this.http.post(environment.api + `/posts/${postId}/comments`, {text});
  }
}
