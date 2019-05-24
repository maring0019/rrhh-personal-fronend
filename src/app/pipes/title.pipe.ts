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
        if(isEmpty(value)){
            return '---';
        }
        else{
            return titleCase(''+value);
        }
    }
}


export function titleCase(str) {
    console.log('TITLEANDO');
    console.log(str)
    const title =str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    console.log('TITULO');
    console.log(title);
    return title;
}
function isEmpty(obj){
    return obj === null || undefined
    ? true
    : (() => {
            for (const prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    return false;
                }
            }
            return true;
        })();
}

