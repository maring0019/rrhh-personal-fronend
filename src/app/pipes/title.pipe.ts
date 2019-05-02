import { Pipe, PipeTransform } from '@angular/core';

/**
 * Implementa un pipe de fecha u hora utilizando moment.js
 *
 * @export
 * @class FechaPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
    transform(value: any, arg1: string): any {
        if (value) {
            return titleCase(value);
        }
        else {
            return '---';
        }
    }
}


export function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

