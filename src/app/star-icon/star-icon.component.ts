import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-star-icon',
  templateUrl: './star-icon.component.html',
  styleUrls: ['./star-icon.component.css']
})
export class StarIconComponent {

  @Input() iconColor;

}
