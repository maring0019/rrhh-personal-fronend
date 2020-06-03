import { Pipe, PipeTransform } from '@angular/core';

/**
 * 
 */
@Pipe({ name: 'historialMotivo' })
export class HistorialMotivoPipe implements PipeTransform {
    transform(value: any): any {
        if(!value){
            return '';
        }
        else{
            if (typeof value === 'string'){
                return value;
            }
            else{
                if (value.nombre) return value.nombre;
            }
        }
    }
}