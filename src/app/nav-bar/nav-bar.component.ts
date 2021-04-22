import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('rotatePlus', [
      state('move', style({
        transform: 'rotate(45deg)'
      })),
      state('reset', style({
        transform: 'rotate(0deg)'
      })),
      transition('* => *', animate('50ms ease-out'))
    ])
  ]
})
export class NavBarComponent implements OnInit {

  btnText: string = "Enregistrer";
  isAuth: boolean;
  isAdd: boolean = false;
  showModal: boolean = false;
  userEmail: string = '';

  position: string;

  constructor(private authService: AuthService,
              private noteService: NotesService) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.userEmail = user.email;
        } else {
          this.isAuth = false;
        }
      }
      );
  }

  signOut() {
    this.authService.signOutUser(); 
  }

  changePosition(newPosition: string) {
    this.position = newPosition;
  }

  changeValue() {
    this.isAdd = this.isAdd === true ? false : true;
  }

  getValue() {
    return this.isAdd;
  }

  openModal = () => {
    this.showModal = !this.showModal;
  }

}
