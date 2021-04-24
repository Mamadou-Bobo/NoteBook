import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FilterPipe } from '../filterPipe/filter.pipe';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent extends FilterPipe implements OnInit{
  
  notesList: Note[];
  
  @Input() show = false;
  @Input() customClass = '';
  @Input() closeCallback = () => (false);
  @Input() index;
  @Input() noteTitle: string;
  @Input() textToSearch: string;
  @Input() isFavorite: boolean = false;
  
  isAuth: boolean;

  constructor(private noteService: NotesService) {
    super();
  }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  /**
   * on supprime la note en mettant à jour l'id de toutes les notes.
   **/
  deleteNote(): void {
    if(this.isAuth) {

      let i = 0;

      this.notesList = this.transform(this.noteService.notesList,this.textToSearch);

      if(this.isFavorite) {
        this.notesList = this.notesList.filter(note => note.iconColor !== "#ffffff");        
      }

      this.noteService.deleteNote(this.notesList[this.index].noteId);

      this.noteService.notesList.forEach(() => {
        this.noteService.updateNoteId(i,i);
        i++;
      });
    } else {
      this.noteService.notesList.splice(this.index, 1);
    }
  }

}
