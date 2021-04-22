import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public noteService: NotesService) { 
    this.noteService.textToSearch = "";
  }

}
