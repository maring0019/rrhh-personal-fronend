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
        if(!value){
            return '---';
        }
        else{
            if (typeof value === 'string' || typeof value === 'number'){
                return titleCase(''+value);
            }
            else{
                if (arg1 && arg1 in value){
                    return titleCase(value[arg1]);
                }
                else{
                    return titleCase(''+value);
                }
            }
        }
    }
}


export function titleCase(str) {
    const title =str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    return title;
}