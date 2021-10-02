import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'vnd'})
export class CurrencyVNDPipe implements PipeTransform {

  symbol = '';

  transform(value: any = ''): string {
    value = value.toString().replace(/\s|\./g, '');
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + this.symbol;
  }
}
