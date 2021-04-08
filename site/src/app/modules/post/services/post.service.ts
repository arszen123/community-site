import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ListPost, Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCache: Map<string, QueryRef<any>>;
  private postsQueryRef: QueryRef<any>;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    ) {
      this.postsCache = new Map();
    }

  getPosts() {
    if (!this.postsQueryRef) {
      this.postsQueryRef = this.apollo.watchQuery<ListPost[]>({
        query: gql`query {
          posts {
            id
            title
            numberOfComments
            createdAt
          }
        }`
      });
    }
    return this.postsQueryRef.valueChanges.pipe(map(res => (res.data as any).posts)) 
  }

  findById(id: string): Observable<any> {
    this._refreshCachedPost(id);
    return this.postsCache.get(id).valueChanges.pipe(map(res => (res.data as any).post));
  }

  create(post: {title: string, description: string}) {
    return this.http.post(environment.api + '/posts', post).pipe( tap(() => this._refreshPosts()));
  }

  addComment(postId: string, text: string) {
    return this.http.post(environment.api + `/posts/${postId}/comments`, {text}).pipe(tap(() => this._refreshCachedPost(postId, true)));
  }

  voteComment(postId: string, commentId: string, isUpvote: boolean) {
    const vote = isUpvote ? 'true' : 'false';
    return this.http.post(environment.api + `/posts/${postId}/comments/${commentId}/vote/${vote}`, {}).pipe(tap(() => this._refreshCachedPost(postId, true)));
  }

  /**
   * Refresh posts query ref.
   */
  private _refreshPosts() {
    if (this.postsQueryRef) {
      this.postsQueryRef.refetch();
    }
  }

  /**
   * Refreshes the cached post QueryRef
   * @param id 
   * @param forceRefresh 
   */
  private _refreshCachedPost(id: string, forceRefresh: boolean = false) {
    let refresh = forceRefresh;
    if (!this.postsCache.has(id)) {
      this.postsCache.set(id, this._getPostQuery(id));
      refresh = true;
    }
    if (refresh) {
      this.postsCache.get(id).refetch();
    }
  }

  /**
   * Returns a QueryRef for the post. 
   * @param id
   */
  private _getPostQuery(id: string) {
    return this.apollo.watchQuery<Post>({
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
            id
            text
            createdAt
            numberOfUpvotes
            numberOfDownvotes
            user {
              username
            }
          }
        }
      }`,
      variables: {
        id,
      },
      partialRefetch: true,
    });
  }
}
