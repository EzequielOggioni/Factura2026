import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../clases/user';

@Pipe({
  name: 'fitraUser',
})
export class FitraUserPipe implements PipeTransform {

  transform(value: User[]|null, filtro: string): User[] {
    if (!value) return [];
    if (!filtro) return value;

    return value.filter((user) => {
      return user.title.toLowerCase().includes(filtro.toLowerCase()) 
      || user.body.toLowerCase().includes(filtro.toLowerCase())  ;
    });
  }

}
