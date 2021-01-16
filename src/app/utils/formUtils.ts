import { FormGroup, FormGroupDirective } from "@angular/forms";

export function markFormAsInvalid(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
        markFieldAsInvalid(form, field);
        // const control = form.get(field);
        // control.markAsTouched({ onlySelf: true });
    });
}

export function markFieldAsInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    control.markAsTouched({ onlySelf: true });
}

/**
 * Reset de los valores del formGroup, y reset del actual estado del form
 * submitted. Workaround:
 * https://github.com/angular/components/issues/4190#issuecomment-305222426
 */
export function resetForm(form: FormGroup, formDirective?: FormGroupDirective) {
    form.reset();
    if (formDirective) {
        formDirective.resetForm();
    }
}

export function isEmpty(obj) {
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

export function getDirtyValues(cg: FormGroup) {
    const dirtyValues = {};
    Object.keys(cg.controls).forEach((c) => {
        const currentControl = cg.get(c);

        if (currentControl.dirty) {
            dirtyValues[c] = currentControl.value;
        }
    });
    return dirtyValues;
}

/**
 * Patch para poder visualizar correctamente las fechas cuando se trabaja con reactive forms
 * y se inicializan con valores por default. Si no se provee un listado de campos tipo fecha,
 * intentamos determinar los campos fecha programaticamente y hacemos el patch de los mismos.
 * La forma mas practica de utilizarlo es implementando la interface AfterViewInit de algun
 * componente que lo requiera e invocar el mismo.
 * @param form formulario que contiene campos tipo Date
 * @param dateFields listado con los nombres de los campos de tipo Date
 */
export function patchFormDates(form:FormGroup, dateFields:string[]=[]){
    const fieldsToPatch = {};
    if (dateFields && dateFields.length){
        for (const dateKey of dateFields) {
            fieldsToPatch[dateKey] = form.value[dateKey];
        }
    }
    else{
        Object.keys(form.value).forEach((key) => {
            if (form.value[key] instanceof Date){
                fieldsToPatch[key] = form.value[key];
            }        
        });
    }

    window.setTimeout(() => {
        form.patchValue(fieldsToPatch, {emitEvent:false})
    }, 1000);
}
