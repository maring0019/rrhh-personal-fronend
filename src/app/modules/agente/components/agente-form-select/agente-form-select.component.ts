import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
    selector: 'app-agente-form-select',
    templateUrl: './agente-form-select.html',
})
export class AgenteFormSelectComponent implements OnInit, OnDestroy {

    private timeoutHandle: number;

    constructor(private agenteService: AgenteService){}
    
    ngOnInit() {
        // this.initFormSelectOptions();
        // this.form = this.initAgenteFilterForm();
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

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

}

