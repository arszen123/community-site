import { Component, Input } from '@angular/core';
import { ListPost } from '../../interfaces/post';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input()
  post: ListPost;

}
