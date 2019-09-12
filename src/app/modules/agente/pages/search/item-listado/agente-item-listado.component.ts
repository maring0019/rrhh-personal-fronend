import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { Agente } from 'src/app/models/Agente';
import { DropdownItem } from '@andes/plex';
import { ModalService } from '../../../../../services/modal.service';

export interface ActionEvent {
    accion:String;
    objeto:Agente;
}

@Component({
    selector: 'app-agente-item-listado',
    templateUrl: './agente-item-listado.html',
    styleUrls: ['./agente-item-listado.scss']
})
export class AgenteItemListadoComponent {
    public routes = ['Ausencias', 'Editar']

    private _agentes: Agente[];
    private agenteSeleccionado: Agente;

    public accionesDropdownMenu = [];


    // Propiedades públicas
    public listado: Agente[]; // Contiene un listado plano de agentes


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

    set agentes(agentes: Agente[]) {

        agentes.map(a => {
            let acciones:DropdownItem[] = [
                { 
                    label: 'Dar de Baja',
                    icon: 'flag',
                    handler: (() => {
                        this.seleccionarAgente(a);
                        this.modalService.open('modal-baja-agente');
                        // this.accion.emit({accion:'baja', objeto:a})
                    }) },
                { label: 'Ir a ruta inexistente', icon: 'pencil', route: '/ruta-rota' },
                { label: 'Item con handler', icon: 'eye     ', handler: (() => { alert('Este es un handler'); }) }
            ];
            this.accionesDropdownMenu.push(acciones);
        })
        this._agentes = agentes;
        if (agentes && agentes.length) {
            this.listado = agentes;
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
     */
    @Output() selected: EventEmitter<Agente> = new EventEmitter<Agente>();
    
    /**
     * Evento que se emite cuando el mouse está sobre un agente
     */
    @Output() hover: EventEmitter<Agente> = new EventEmitter<Agente>();

    /**
     * Evento que se emite cuando el mouse está sobre un agente
     */
    @Output() accion: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();


    constructor(private router: Router, private modalService: ModalService) {}

    public seleccionarAgente(agente: Agente) {
        if (this.agenteSeleccionado !== agente) {
            this.agenteSeleccionado = agente;
            this.selected.emit(this.agenteSeleccionado);
        }
    }

    public hoverAgente(agente: Agente) {
        this.hover.emit(agente);
    }

    public gotoAgente(agente) {
        if (agente.id){
            this.router.navigate(['/agentes/registro' , { id: agente.id }]);
        }
        else{
            this.router.navigate(['/agentes/registro']);
        }
    }

    public gotoAusenciasAgente(agente){
        if (agente.id){
            this.router.navigateByUrl(`/agentes/${agente.id}/ausencias/listado`);
            // this.router.navigate(['/agentes/ausencias' , { id: agente.id }]);
        }
    }
  

    public onCancelBaja(e){
        this.modalService.close('modal-baja-agente');
    }

    public onSuccessBaja(e){

        this.modalService.close('modal-baja-agente');
    }
}

