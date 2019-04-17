import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';

import { ISituacion } from 'src/app/models/ISituacion';
import { SituacionService } from 'src/app/services/tm/situacion.service';


@Component({
    selector: 'create-update-situacion',
    templateUrl: './create-update-situacion.component.html',
    styleUrls: ['./create-update-situacion.component.scss']
  })
  export class CreateUpdateSituacionComponent implements OnInit {

    @HostBinding('class.plex-layout') layout = true;  // Permite el uso de flex-box en el componente
    @Input() situacion: ISituacion;
    @Output() outputData: EventEmitter<ISituacion> = new EventEmitter<ISituacion>();

    public modelo: any = {};

    constructor(private situacionService: SituacionService) { }

    ngOnInit() {
        let id = this.situacion ? this.situacion.id : null;
        let nombre = this.situacion ? this.situacion.nombre : '';
        let requiereVencimiento = this.situacion ? this.situacion.requiereVencimiento : false;
        this.modelo = { id, nombre, requiereVencimiento}
    }

    onCancel(){
        this.outputData.emit(null);
        return false;
    }

    onSave(event){
        if (event.formValid) {
            const obj:ISituacion = this.modelo;
            if (obj.id){
                this.situacionService.put(obj)
                    .subscribe(dato => this.outputData.emit(dato));
            }
            else{
                this.situacionService.post(obj)
                    .subscribe(dato => this.outputData.emit(dato));
            }
        }
    }
}

