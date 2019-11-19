import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
    selector: 'app-ubicacion-form-select',
    templateUrl: './ubicacion-form-select.html',
})
export class UbicaciónFormSelectComponent {
    
    @Input() parent: FormGroup;
    @Input() name: string = "ubicacion";
    @Input() formControlName: string = "ubicacion";
    @Input() label: string;
    @Input() placeholder: string = "Seleccione ubicación";

    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    public ubicaciones$ = this.ubicacionService.get({});
    
    constructor(private ubicacionService: UbicacionService){}

    public onChange(obj){
        this.change.emit(obj);
    }

}

