import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  animations: [
    trigger('colorsAnimation', [
      transition('* => *', [
        query('i', style({ opacity: 0})),
        query('i',
          stagger('150ms', [
            animate('900ms', 
              style({opacity: 1, offset: 0.2}))
          ]))
      ])
    ])
  ]
})
export class ColorComponent implements OnInit {

  colors = [
    {
      name: '#FC6D6D'
    },
    {
      name : '#03DAC5'
    },
    {
      name : '#64B5F6'
    },
    {
      name : '#BE6DFC'
    },
    {
      name : '#F423C5'
    },
  ]

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
  }

  getColor(index: number) {
    this.noteService.color = this.noteService.getColor(index);
  }

}
