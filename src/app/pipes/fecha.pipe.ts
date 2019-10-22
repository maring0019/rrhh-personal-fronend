import { Pipe, PipeTransform } from '@angular/core';

/**
 * Implementa un pipe de fecha u hora utilizando moment.js
 *
 * @export
 * @class FechaPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'fecha' })
export class FechaPipe implements PipeTransform {
    transform(value: any, arg1: string): any {
        if (arg1) {
            if (arg1 === 'diahora') return moment(value).format('ddd DD/MM hh:mm');
            if (arg1 === 'utc') return moment(value).utc().format('DD/MM/YYYY');
            if (arg1 === 'dia') return moment(value).format('dddd');
        } else {
            return moment(value).format('DD/MM/YYYY');
        }
    }
}
