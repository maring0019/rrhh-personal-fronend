import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { AgenteService } from 'src/app/services/agente.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-agente-select-input',
    templateUrl: 'agente-select-input.html'
})
export class AgenteSelectInputComponent implements OnInit{

    @Input() form: FormGroup; // Parent form
    @Input() editable: Boolean = true;
    @Output() change:EventEmitter<any> = new EventEmitter<any>();
    
    private timeoutHandle: number;

    constructor(private agenteService: AgenteService){}

    ngOnInit(){}


    public onSearchAgentes(event){
        let params:any = {};
        let textoLibre = event.query? event.query.trim(): "";
        if (textoLibre && textoLibre.length >= 4){
            // Cancela la búsqueda anterior
            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
            // Preparamos los nuevos filtros
            const exps = textoLibre.split(" ");
            let andFilters = [];
            for (let exp of exps) {
                const orFilters = {"$or":[
                    {"nombre"   :{"$regex": exp, "$options":"i"}},
                    {"apellido" :{"$regex": exp, "$options":"i"}},
                    {"documento":{"$regex": exp, "$options":"i"}},
                    {"numero":{"$regex": exp, "$options":"i"}},
                ]}
                andFilters.push(orFilters);
            }
            params['filter'] = JSON.stringify({"$and" : andFilters})

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