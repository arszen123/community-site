import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Profile } from '../../interfaces/user';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<Profile>;
  isMe = true;

  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(concatMap(({id}) => {
      this.isMe = true;
      if (typeof id === 'undefined') {
        return this.profileService.getProfile();
      }
      this.isMe = false;
      return this.profileService.getProfileById(id);
    }));
  }

}
