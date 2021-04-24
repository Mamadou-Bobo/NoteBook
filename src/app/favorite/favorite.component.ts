import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { FilterPipe } from '../filterPipe/filter.pipe';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent extends FilterPipe implements OnInit, OnDestroy {

  favoriteNote: Note[];
  noteSubscription: Subscription;

  showLoader: boolean = true;

  noteIndex: number;
  titleInput: string;
  descriptionInput: string;
  noteId: number;
  noteTitle: string;
  btnText: string = 'Modifier';

  showModal: boolean = false;
  showAlertModal: boolean = false;

  @Input() textToSearch: string;

  constructor(public noteService: NotesService) { 
    super();
  }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        this.noteSubscription = this.noteService.notesListSubject.subscribe(
          (value) => {
            this.showLoader = false;
            this.favoriteNote = value.filter(
              note => note.iconColor !== "#ffffff"
            );
          }
        );
        if(user) {
          this.noteService.getNotes(user.uid);
          this.noteService.emitNotes();
        } else {
          // on vide le tableau des notes qui se trouve dans le service pour s'arrurer qu'on reçoit 
          // toujours les données de l'utilisateur connecté et non les anciennes données contenues dans 
          // le tableau
          this.noteService.notesList.splice(0,this.noteService.notesList.length);
          this.showLoader = false;
        }
      }
    );
  }

  openModal = () => {
    this.showModal = !this.showModal;
  }

  openAlertModal = () => {
    this.showAlertModal = !this.showAlertModal;
  }

  switchColor(index: number) {
    this.favoriteNote = this.transform(this.favoriteNote,this.noteService.textToSearch);

    this.noteService.updateStarIconColor(this.favoriteNote[index].noteId);
  }

  getData(index: number): void {
    this.noteIndex = index;
    this.titleInput =  this.favoriteNote[index].title;
    this.descriptionInput = this.favoriteNote[index].description;
  }

  getIndex(index: number): void {
    this.noteId = index;
    this.noteTitle = this.favoriteNote[index].title;
  }

  ngOnDestroy(): void {
    this.noteSubscription.unsubscribe();
  }

}
