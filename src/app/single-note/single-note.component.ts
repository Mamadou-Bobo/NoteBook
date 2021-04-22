import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Pipe, SimpleChanges, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { FilterPipe } from '../filterPipe/filter.pipe';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent extends FilterPipe implements OnInit, OnDestroy {

  input: ElementRef;

  color: string;
  isClicked: boolean = false;

  @Input() title: string;
  @Input() description: string;
  @Input() indexOfColor: number;
  @Input() textToSearch: string;

  notesList: Note[];
  noteSubscription: Subscription;

  showModal: boolean = false;
  showAlertModal: boolean = false;
  showLoader: boolean = true;
  isAuth: boolean;

  btnText: string = 'Modifier';

  titleInput: string;
  descriptionInput: string;
  noteTitle: string;

  noteIndex: number;
  noteId: number;

  whiteColor: string = "#ffffff";

  constructor(private noteService: NotesService){
    super();
  }

  ngOnInit(){
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        this.noteSubscription = this.noteService.notesListSubject.subscribe(
          (note: Note[]) => {
            this.showLoader = false;
            this.notesList = note;
          }
        );

        if(user) {
          this.isAuth = true;
          this.noteService.notesList.splice(0,this.noteService.notesList.length);
          this.noteService.getNotes(user.uid);
          this.noteService.emitNotes();
        } else {
          this.isAuth = false;
          // on vide le tableau des notes qui se trouve dans le service pour s'arrurer qu'on reçoit 
          // toujours les données de l'utilisateur connecté et non les anciennes données contenues dans 
          // le tableau
          this.noteService.notesList.splice(0,this.noteService.notesList.length);

          this.noteService.getNotes(user);
          this.noteService.emitNotes();

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
    this.notesList = this.transform(this.notesList,this.textToSearch);

    this.noteService.updateStarIconColor(this.notesList[index].noteId);
  }

  getData(index: number): void {
    this.noteIndex = index;
    this.titleInput =  this.notesList[index].title;
    this.descriptionInput = this.notesList[index].description;
  }

  getIndex(index: number): void {
    this.noteId = index;
    this.noteTitle = this.notesList[index].title;
  }

  removeNote(index: number) {
    this.noteService.deleteNote(index);
  }

  ngOnDestroy(): void {
    this.noteSubscription.unsubscribe();
  }
  
}
