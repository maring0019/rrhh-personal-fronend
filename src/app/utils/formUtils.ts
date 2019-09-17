import { FormGroup, FormGroupDirective } from '@angular/forms';

export function markFormAsInvalid(form:FormGroup){
    Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        control.markAsTouched({ onlySelf: true });
    });
}


/**
 * Reset de los valores del formGroup, y reset del actual estado del form
 * submitted. Workaround:
 * https://github.com/angular/components/issues/4190#issuecomment-305222426
 */
export function resetForm(form:FormGroup, formDirective?:FormGroupDirective){
    form.reset();
    if (formDirective) {
        formDirective.resetForm();
    } 
}


export function isEmpty(obj){
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