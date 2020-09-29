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
