import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fitra',
})
export class FitraPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
