import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, AfterContentInit } from '@angular/core';
import * as firebase from 'firebase';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() button: string;  
  @Input() show = false;
  @Input() closeCallback = () => (false);

  @Input() titleModel: string;
  @Input() descriptionModel: string;
  @Input() index: number;
  @Input() formTitle: string;

  newDate: Date = new Date();
  isAuth: boolean;

  constructor(private noteService: NotesService,
              private datePipe: DatePipe) { 
  }

  ngOnInit() {
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

  create() {
      // firebase
      const title = this.titleModel.replace(/  +/g, ' ');
      const description = this.descriptionModel.replace(/  +/g, ' ');
      const bgColor = this.noteService.color;
      const iconColor = this.noteService.iconColor;
      
      const note = new Note(iconColor,
                            title,
                            description,
                            bgColor,
                            this.datePipe.transform(this.newDate, 'dd/MM/yyyy'),
                            this.noteService.notesList.length);

      if(this.isAuth) {
        this.noteService.createNewNote(note);
      } else {
        this.noteService.notesList.unshift(note);
      }

      this.titleModel = this.descriptionModel = '';

      this.closeCallback();
  }

  update() {
    if(this.isAuth) {
      this.noteService.updateNote(this.index,
        this.titleModel,
        this.descriptionModel,
        this.datePipe.transform(this.newDate, 'dd/MM/yyyy'));
    } else {
      const title = this.titleModel;
      const description = this.descriptionModel;

      this.noteService.notesList[this.index].description = description;
      this.noteService.notesList[this.index].title = title;
      this.noteService.notesList[this.index].date = this.datePipe.transform(this.newDate, 'dd/MM/yyyy');
    }

    this.closeCallback();
  }

}