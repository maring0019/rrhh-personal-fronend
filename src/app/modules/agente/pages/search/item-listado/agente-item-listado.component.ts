import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-agente-item-listado',
    templateUrl: './agente-item-listado.html',
    styleUrls: ['./agente-item-listado.scss']
})
export class AgenteItemListadoComponent {
    private _agentes: Agente[];
    private seleccionado: Agente;

    // Propiedades públicas
    public listado: Agente[]; // Contiene un listado plano de agentes

    /**
     * Listado de agentes para mostrar. Acepta una lista de agentes
     *
     * @type {(Agente[])}
     */
    @Input()
    get agentes(): Agente[] {
        return this._agentes;
    }

    set agentes(value: Agente[]) {
        this._agentes = value;
        if (value && value.length) {
            this.listado = value;
        } else {
            this.listado = [];
        }
    }

    /**
    * Indica como se muestra la tabla de resultados
    */
    @Input() type: 'default' | 'sm' = 'default';
    
    /**
     * Evento que se emite cuando se selecciona un agente
     * @type {EventEmitter<Agente>}
     */
    @Output() selected: EventEmitter<Agente> = new EventEmitter<Agente>();
    
    /**
     * Evento que se emite cuando el mouse está sobre un agente
     * @type {EventEmitter<any>}
     */
    @Output() hover: EventEmitter<Agente> = new EventEmitter<Agente>();


    constructor() {}

    public seleccionarAgente(agente: Agente) {
        if (this.seleccionado !== agente) {
            this.seleccionado = agente;
            this.selected.emit(this.seleccionado);
        } else {
            this.seleccionado = null;
            this.selected.emit(null);
        }
    }

    public hoverAgente(agente: Agente) {
        this.hover.emit(agente);
    }
}

