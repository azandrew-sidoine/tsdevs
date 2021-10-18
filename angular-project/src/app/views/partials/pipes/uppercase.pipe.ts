import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'case'
})
export class CasePipe implements PipeTransform {

transform(value: string, _case?: string): string {
    if (typeof value === 'number') {
      throw new Error('Invalid parameter passed!!');
    }
    _case = _case || 'uppercase'; // UPPERCASE // LOWERCASE
    switch (_case?.toLocaleLowerCase()) {
      case 'uppercase':
        return value?.toUpperCase();
      case 'lowercase':
        return value?.toLocaleLowerCase();
      default:
        return value;
        // throw new Error('Undefined case');
    }
  }

}
