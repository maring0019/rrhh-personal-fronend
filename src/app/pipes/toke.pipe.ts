import { Pipe, PipeTransform } from '@angular/core';

/**
 * @class TokenPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'token' })
export class TokenPipe implements PipeTransform {
    transform(value: string): any {
        const token = window.sessionStorage.getItem('jwt') ? '?token=' + window.sessionStorage.getItem('jwt') : ''
        return value + token;
    }
}