import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullnamecompany'
})
export class FullnameCompanyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.firstname + ' ' + value.lastname + ' | ' + value.company;
  }

}
