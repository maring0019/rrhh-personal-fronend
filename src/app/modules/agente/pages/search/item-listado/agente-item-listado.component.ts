import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { Agente } from 'src/app/models/Agente';

export interface DropdownItem {
    /**
     * Label del item
     *
     * @type {string}
     * @memberOf DropdownItem
     */
    label?: string;
    /**
     * Clase css del ícono
     *
     * @type {string}
     * @memberOf DropdownItem
     */
    icon?: string;
    /**
     * Ruta opción para Angular Router
     *
     * @type {string}
     * @memberOf DropdownItem
     */
    route?: string;
    /**
     * Callback a ejecutar cuando se selecciona el item
     *
     * @type {Function}
     * @memberOf DropdownItem
     */
    handler?: Function;
    /**
     * Indica si el item es un divisor
     *
     * @type {boolean}
     * @memberOf DropdownItem
     */
    divider?: boolean;
}

@Component({
    selector: 'app-agente-item-listado',
    templateUrl: './agente-item-listado.html',
    styleUrls: ['./agente-item-listado.scss']
})
export class AgenteItemListadoComponent {
    public routes = ['Ausencias', 'Editar']

    private _agentes: Agente[];
    private seleccionado: Agente;

    // Propiedades públicas
    public listado: Agente[]; // Contiene un listado plano de agentes

    public dropitems: DropdownItem[] = [
        { label: 'Ir a inicio', icon: 'flag', route: '/incio' },
        { label: 'Ir a ruta inexistente', icon: 'pencil', route: '/ruta-rota' },
        { label: 'Item con handler', icon: 'eye     ', handler: (() => { alert('Este es un handler'); }) }
    ];
    layout = 'derecha';

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


    constructor(private router: Router) {}

    public seleccionarAgente(agente: Agente) {
        if (this.seleccionado !== agente) {
            this.seleccionado = agente;
            this.selected.emit(this.seleccionado);
        }
    }

    public hoverAgente(agente: Agente) {
        this.hover.emit(agente);
    }

    gotoAgente(agente) {
        if (agente.id){
            this.router.navigate(['/agentes/registro' , { id: agente.id }]);
        }
        else{
            this.router.navigate(['/agentes/registro']);
        }
    }

    gotoAusenciasAgente(agente){
        if (agente.id){
            this.router.navigateByUrl(`/agentes/${agente.id}/ausencias/listado`);
            // this.router.navigate(['/agentes/ausencias' , { id: agente.id }]);
        }
    }
}

