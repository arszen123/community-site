import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Profile } from '../interfaces/user';

const GQL_QUERY_PROFILE_DATA = `
    id
    username
    posts {
      id
      title
      createdAt
      numberOfComments
    }`;

export const GQL_QUERY_ME = gql`query { me { ${GQL_QUERY_PROFILE_DATA} } }`

export const GQL_QUERY_PROFILE = gql`query ($id: ID!) { user(id: $id) { ${GQL_QUERY_PROFILE_DATA} } }`;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private meQueryRef: QueryRef<any>;

  constructor(private apollo: Apollo) { }

  getProfile() {
    if (!this.meQueryRef) {
      this.meQueryRef = this.apollo.watchQuery<Profile>({
        query: GQL_QUERY_ME,
      });
    }
    return this.meQueryRef.valueChanges.pipe(map(res => (res.data as any).me));
  }

  getProfileById(id: string) {
    const res = this.apollo.watchQuery<Profile>({
      query: GQL_QUERY_PROFILE,
      variables: { id },
    });
    return res.valueChanges.pipe(map(res => (res.data as any).user));
  }
}
