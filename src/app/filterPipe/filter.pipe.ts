import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Note[], input: any): any {
    if(input) {
      return value.filter(item => {
        return item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())
         || item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()) 
         || item.date.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      });
    } else {
      return value;
    }
  }

  filterArray(value: Note[], input: any): any {

  }

}
