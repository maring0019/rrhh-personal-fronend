import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { AgenteService } from "src/app/services/agente.service";
import { FormGroup } from "@angular/forms";
import { Agente } from "src/app/models/Agente";
import { Ubicacion } from 'src/app/models/Ubicacion';
import { getAgenteSearchParams } from 'src/app/utils/searchUtils';


@Component({
    selector: "app-agente-select-input",
    templateUrl: "agente-select-input.html",
})
export class AgenteSelectInputComponent implements OnInit {
    @Input() form: FormGroup; // Parent form
    @Input() editable: Boolean = true;
    @Input() required: Boolean = false;
    @Input() agente: Agente;
    @Input() serviciosAllowed: Ubicacion[];
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    private timeoutHandle: number;

    public get agenteText() {
        return this.agente
            ? `${this.agente.numero} - ${this.agente.apellido}, ${this.agente.nombre}`
            : "";
    }

    constructor(private agenteService: AgenteService) {}

    ngOnInit() {}

    public onSearchAgentes(event) {
        let params: any = {};
        let textoLibre = event.query ? event.query.trim() : "";
        if (textoLibre && textoLibre.length >= 3) {
            // Cancela la búsqueda anterior
            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
            // Preparamos los nuevos filtros
            params = getAgenteSearchParams(params, textoLibre);
            // Filtramos los agentes en funcion de los servicios permitidos
            if (this.serviciosAllowed && this.serviciosAllowed.length){
                params['situacionLaboral.cargo.ubicacion._id'] = this.serviciosAllowed.map(i=>i._id)
            }
            this.timeoutHandle = window.setTimeout(() => {
                this.timeoutHandle = null;
                this.agenteService.search(params).subscribe(
                    (agentes) => {
                        agentes.map((dato: any) => {
                            dato.data = `${dato.numero} - ${dato.apellido}, ${dato.nombre} (${dato.activo? 'Activo':'Baja'})`;
                        });
                        event.callback(agentes);
                    },
                    (err) => {
                        event.callback([]);
                    }
                );
            }, 1000);
        } else {
            event.callback([]);
        }
    }

    public onChangeAgenteSelect(event) {
        this.agente = event.value;
        this.change.emit(event);
    }
}
