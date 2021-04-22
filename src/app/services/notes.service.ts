import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Note } from '../models/note.model';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NotesService implements OnInit {
  
  // notes: any[];
  color: string;
  iconColor: string = "#ffffff";

  colors = ['#FC6D6D','#03DAC5','#64B5F6','#BE6DFC','#F423C5'];

  // firebase
  notesList: Note[] = [];
  notesListSubject = new Subject<Note[]>();

  userId: string;
  noteSubscription: Subscription;
  textToSearch: string;
  
  noteIndex: number;
  titleInput: string;
  descriptionInput: string;
  noteId: number;
  noteTitle: string;

  showModal: boolean = false;
  showAlertModal: boolean = false;

  ngOnInit(): void {
  }

  getColor(index: number) {
      // retourne la couleur de la note
      return this.colors[index];
  }

  changeColor(index: number) {
    if(this.notesList[index].iconColor === "#FFDE03") {
      this.notesList[index].iconColor = "#ffffff";
    } else {
      this.notesList[index].iconColor = "#FFDE03";
    }
  }

  emitNotes() {
    this.notesListSubject.next(this.notesList);
  }

  saveNotes() {
    firebase.default.database().ref('/notes/' + this.userId).set(
      this.notesList,
      (error) => {
        if(error) {
          console.log(error);
        } 
      });
  }

  getNotes(uuid) {
    if(uuid !== null) {
      this.userId = uuid;
      firebase.default.database().ref('/notes/'+this.userId)
        .on('value', (data) => {            
            this.notesList = data.val() ? data.val() : [];
            this.emitNotes();
          }
        );
    }
    
  }

  createNewNote(note: Note) {
    this.notesList.push(note);
    this.saveNotes();
    this.emitNotes();
  }

  updateStarIconColor(index: number) {

    this.changeColor(index);

    let update = {};
    
    update['/notes/' + this.userId + '/' + index + '/iconColor'] = this.notesList[index].iconColor;

    return firebase.default.database().ref().update(update);

  }

  updateNote(index: number, title: string, description: string, date: any) {

    let update = {};

    update['/notes/' + this.userId + '/' + index + '/title'] = title;
    update['/notes/' + this.userId + '/' + index + '/description'] = description;
    update['/notes/' + this.userId + '/' + index + '/date'] = date;

    return firebase.default.database().ref().update(update);
  }

  updateNoteId(index: number, noteId: number): any {

    let update = {};

    update['/notes/' + this.userId + '/' + index + '/noteId'] = noteId;

    return firebase.default.database().ref().update(update);
  }

  deleteNote(index: number) {
    let path = '/notes/' + this.userId + '/' + index;
    firebase.default.database().ref(path).remove();
    this.notesList.splice(index, 1);
    this.saveNotes();
    this.emitNotes();
  }

  getCount(): number {
    let i = 0;
    this.notesList.forEach(element => {
      if(element.iconColor == "#FFDE03") {
        i++;
      }
    });
    return i;
  }

}
