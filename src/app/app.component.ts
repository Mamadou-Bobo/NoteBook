import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBa6fKfjzoxPW8LroghG01jUvuXoR7AFBo",
      authDomain: "notebook-58630.firebaseapp.com",
      projectId: "notebook-58630",
      storageBucket: "notebook-58630.appspot.com",
      messagingSenderId: "432413863206",
      appId: "1:432413863206:web:60b37ba2193d0fdc1d25e7"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    // firebase.initializeApp(firebaseConfig); 
  }

}
