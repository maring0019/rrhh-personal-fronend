import { Pipe, PipeTransform } from '@angular/core';

/**
 * Dada una cadena recibida por parametro intenta retornar la misma cadena 
 * con todas sus letras iniciales en mayusculas.
 * Si la cadena ingresada es vacia o nula retorna la cadena '---'
 * Alternativamente a una cadena se puede recibir un objeto mas complejo 
 * acompañado de un argumento indicando el atributo del objeto que contiene
 * la cadena a transformar. La funcion en este caso se llama recursivamente
 * para resolver que valor retornar.
 *
 * @export
 * @class TitlePipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
    transform(value: any, arg1?: string): any {
        if(!value){
            return '---';
        }
        else{
            if (typeof value === 'string' || typeof value === 'number'){
                return titleCase(''+value);
            }
            else{
                if (arg1 && arg1 in value){
                    return this.transform(value[arg1]);
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