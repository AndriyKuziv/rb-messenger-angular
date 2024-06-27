import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number, locale: string = 'en-US'): string | null {
    if (isNaN(value)) {
      return null;
    }

    return new Intl.NumberFormat(locale).format(value);
  }

}
