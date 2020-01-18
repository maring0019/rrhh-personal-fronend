import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';

import { Agente } from 'src/app/models/Agente';
import { ModalService } from 'src/app/services/modal.service';


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
    public agenteSeleccionado: Agente;
    private idxAgenteSeleccionado:any;

    public accionesDropdownMenu = [];

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
        this.accionesDropdownMenu = [];
        agentes.map((a,index) => {
            let acciones:DropdownItem[] = this.prepareAgenteDropdownActions(a, index);
            this.accionesDropdownMenu.push(acciones);
        })
        this._agentes = agentes;
    }

    /**
    * Indica como se muestra la tabla de resultados
    */
    @Input() type: 'default' | 'sm' = 'default';

    /**
    * Indica si es posible realizar acciones extras sobre un agente. 
    * Por defecto la lista se comporta unicamente como un componente
    * de seleccion utilizando la propiedad "selected" para notificar
    * este evento.
    * Si "editable" es true se habilitan las siguientes acciones:
    *     - Ver el detalle de un agente
    *     - Ver ausentismo de un agente
    *     - Dar de baja de un agente
    *     - Activar un agente
    */
    @Input() editable: Boolean = false;
    
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


    constructor(
        private router: Router,
        private modalService: ModalService,
        public plex: Plex) {}

    prepareAgenteDropdownActions(agente, index):DropdownItem[]{
        let acciones:DropdownItem[]= [];
        if (agente.activo){
            acciones.push(this.bajaDropdownAction(agente, index));
            acciones.push(this.historiaLaboralDropdownAction(agente, index));
        }
        else{
            acciones.push(this.reactivarDropdownAction(agente, index));
        }
        return acciones;
        // [
            // { label: 'Ir a ruta inexistente', icon: 'pencil', route: '/ruta-rota' },
            // { label: 'Item con handler', icon: 'eye     ', handler: (() => { alert('Este es un handler'); }) }
        // ];
    }

    private reactivarDropdownAction(agente, index){
        let accion = { 
            label: 'Reactivar agente',
            icon: 'flag',
            handler: (() => {
                this.seleccionarAgente(agente, index);
                this.modalService.open('modal-reactivar-agente');
            }) }
        return accion;
    }

    private bajaDropdownAction(agente, index){
        let accion = { 
            label: 'Dar de Baja',
            icon: 'flag',
            handler: (() => {
                this.seleccionarAgente(agente, index);
                this.modalService.open('modal-baja-agente');
            }) }
        return accion;
    }

    private historiaLaboralDropdownAction(agente, index){
        let accion = { 
            label: 'Nueva Historia Laboral',
            icon: 'plus',
            handler: (() => {
                this.seleccionarAgente(agente, index);
                this.modalService.open('modal-historia-laboral-create');
            }) }
        return accion;
    }

    public seleccionarAgente(agente: Agente, index?) {
        // if (this.agenteSeleccionado !== agente) {
        //     this.agenteSeleccionado = agente;
        //     this.idxAgenteSeleccionado = index;
        //     this.selected.emit(this.agenteSeleccionado);
        // }

        this.agenteSeleccionado = agente;
        this.idxAgenteSeleccionado = index;
        this.selected.emit(this.agenteSeleccionado);
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
        }
    }
  

    public onSuccessBaja(e){
        this.modalService.close('modal-baja-agente');
        this.plex.info('success', 'El agente se dió de baja correctamente');
        // Refresh del agente del listado, y acciones disponibles de su menu
        this.agenteSeleccionado.activo = false;
        this.accionesDropdownMenu[this.idxAgenteSeleccionado] = [
            this.reactivarDropdownAction(this.agenteSeleccionado, this.idxAgenteSeleccionado)
        ]
    }

    public onErrorBaja(e){
    }


    public onCancelModal(modalId:string){
        this.modalService.close(modalId);
    }

    public onSuccessReactivar(e){
        this.modalService.close('modal-reactivar-agente');
        this.plex.info('success', 'El agente se reactivó correctamente');
        // Refresh del agente del listado, y acciones disponibles de su menu
        this.agenteSeleccionado.activo = true;
        this.accionesDropdownMenu[this.idxAgenteSeleccionado] = [
            this.bajaDropdownAction(this.agenteSeleccionado, this.idxAgenteSeleccionado)
        ]
    }

    public onErrorReactivar(e){
        console.log('Fue un error');
        console.log(e);
        // this.modalService.close('modal-baja-agente');
    }
}

