import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Profile } from '../interfaces/user';

const profileDataQuery = `
    id
    username
    posts {
      id
      title
      createdAt
      numberOfComments
    }`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private meQueryRef: QueryRef<any>;

  constructor(private apollo: Apollo) { }

  getProfile() {
    if (!this.meQueryRef) {
      this.meQueryRef = this.apollo.watchQuery<Profile>({
        query: gql`query { me { ${profileDataQuery} } }`
      });
    }
    return this.meQueryRef.valueChanges.pipe(map(res => (res.data as any).me));
  }

  getProfileById(id: string) {
    const res = this.apollo.watchQuery<Profile>({
      query: gql`query ($id: ID!) { user(id: $id) { ${profileDataQuery} } }`,
      variables: { id },
    });
    return res.valueChanges.pipe(map(res => (res.data as any).user));
  }
}
