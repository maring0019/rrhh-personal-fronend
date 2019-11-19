import { Component, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AgenteService } from 'src/app/services/agente.service';

@Component({
    selector: 'app-agente-form-select',
    templateUrl: './agente-form-select.html',
})
export class AgenteFormSelectComponent implements  OnDestroy {
    
    @Input() parent: FormGroup;
    @Input() name: string = "agente";
    @Input() formControlName: string = "agente";
    @Input() placeholder: string = "Seleccione agente";

    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    private timeoutHandler: number;

    constructor(private agenteService: AgenteService){}
    

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandler);
    }

    public onGetData(event){
        if (event && event.query && event.query.length >= 4) {
            // Cancela la búsqueda anterior
            if (this.timeoutHandler) {
                window.clearTimeout(this.timeoutHandler);
            }
            this.timeoutHandler = window.setTimeout(() => {
                this.timeoutHandler = null;
                this.agenteService.filter(event.query).subscribe(
                    (agentes) => {
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

    public onChange(agente){
        this.change.emit(agente);
    }

}

