import { AbstractControl, ValidationErrors } from '@angular/forms';
import { createDate } from '../helpers';

export class DateValidators {
  static before(date?: string | Date) {
    const date_ = createDate(date) as Date;
    return (control: AbstractControl) => {
      if (control.value) {
        return date_ <= createDate(control.value)
          ? ({ dateBefore: date_ } as ValidationErrors)
          : null;
      }
      return null;
    };
  }

  static after(date?: string | Date) {
    date = createDate(date) as Date;
    return (control: AbstractControl) => {
      if (control.value) {
        return (date as Date).getTime() >= createDate(control.value).getTime()
          ? ({ dateAfter: date } as ValidationErrors)
          : null;
      }
      return null;
    };
  }
}
