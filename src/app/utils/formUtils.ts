export function markFormAsInvalid(form){
    Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        control.markAsTouched({ onlySelf: true });
    });
}