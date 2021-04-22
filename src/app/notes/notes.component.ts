import { ElementRef, Component, ViewChild, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotesService } from '../services/notes.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @ViewChild('color', {static: false}) color: ElementRef;
  @ViewChild('alertMmessage', {static: false}) alertMessage: ElementRef;
  
  alert: HTMLElement;


  isAuth: boolean;
  showLoader: boolean = true;
  
  isClicked: boolean;

  textToSearch: string;

  constructor(private authService: AuthService,
              public noteService: NotesService) {}

  ngOnInit() {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
          this.textToSearch = "";
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.alert = this.alertMessage.nativeElement as HTMLElement;
  }

  closeAlertMessage() {
    this.alert.style.display = 'none';
  }

  signOut() {
    this.authService.signOutUser();
  }
}
