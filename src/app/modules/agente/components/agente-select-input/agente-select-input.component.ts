import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { AgenteService } from 'src/app/services/agente.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-agente-select-input',
    templateUrl: 'agente-select-input.html'
})
export class AgenteSelectInputComponent implements OnInit{

    @Input() form: FormGroup;
    @Input() editable: Boolean = true;
    @Output() change:EventEmitter<any> = new EventEmitter<any>();
    
    private timeoutHandle: number;

    constructor(private agenteService: AgenteService){}

    ngOnInit(){}


    public onSearchAgentes(event){
        if (event && event.query && event.query.length >= 4) {
            // Cancela la búsqueda anterior
            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
            
            let params:any = {};
            params['filter'] = JSON.stringify(
                {"$or":[
                    {"nombre"   :{"$regex": event.query, "$options":"i"}},
                    {"apellido" :{"$regex": event.query, "$options":"i"}},
                    {"numero"   :{"$regex": event.query, "$options":"i"}},
                ]});
            this.timeoutHandle = window.setTimeout(() => {
                this.timeoutHandle = null;
                this.agenteService.search(params).subscribe(
                    (agentes) => {
                        agentes.map(dato => { dato.nombre = `${dato.numero} - ${dato.apellido}, ${dato.nombre}`});
                        event.callback(agentes);
                    },
                    (err) => {
                        event.callback([]);
                    });
            }, 1000);
        
        }
        else {    
            event.callback([]);
        }
    }

    public onChangeAgente(event){
        this.change.emit(event);
    }

}