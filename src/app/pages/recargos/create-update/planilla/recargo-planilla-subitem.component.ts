import { ItemPlanilla, RecargoItemPlanilla } from 'src/app/models/Recargo';
import { Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-recargo-planilla-subitem',
    templateUrl: './recargo-planilla-subitem.html'
  })
export class RecargoPlanillaSubItemComponent {

    @Input() recargoAgente: RecargoItemPlanilla;
    @Input() justificacionOpciones: any;
    @Input() turnoOpciones: any;
    @Input() editable:Boolean = false; // Ninguna accion esta permitida en caso de ser false
    @Input() modoEscritura:Boolean = false; // Indica si la planilla se inicia en modo escritura
    @Output() procesar: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleted: EventEmitter<any> = new EventEmitter<any>();

    public sortColumn = 'codigo';
    // list-head options
    public columnDef =
    [
        {
            id: 'agente',
            title: 'Agente',
            size: '15'
        },
        {
            id: 'fecha',
            title: 'Fecha',
            size: '15'
        },
        {
            id: 'turnos',
            title: 'Turnos',
            size: '15'
        },
        {
            id: 'justificacion',
            title: 'Justificación',
            size: '20'
        },
        {
            id: 'observaciones',
            title: 'Observaciones',
            size: '20'
        },
        {
            id: 'normales',
            title: 'Normal',
            size: '5'
        },
        {
            id: 'excedidos',
            title: 'Excedido',
            size: '5'
        },
        {
            id: 'total',
            title: 'Total',
            size: '5'
        },
    ]

    public addRecargo(){
        this.rollbackProcesar()
        this.recargoAgente.items.push(new ItemPlanilla(this.recargoAgente.agente))
    }

    public deleteItem(item, index){
        this.rollbackProcesar();
        this.recargoAgente.items.splice(index, 1);
        this.deleted.emit(item);
    }

    /**
     * Cuando se procesa el recargo un agente, notificamos este evento
     * @param value boolean
     */
    public changeProcesado(value){
        this.procesar.emit(value);
        // Si el procesamiento no fallo no tenes este dato. Por el momento 
        // siempre inhabilitamos la edicion luego de procesar un parte.
        this.modoEscritura = false;
    }

    /**
     * Cada vez que se produce un cambio en los datos de un agente, marcamos los
     * datos de ese agente como no procesado.
     * Los cambios NO se persisten hasta que explicitamente se procese el parte del
     * agente. Ver changeProcesado()
     * Esto es particularmente util para el area de personal, ya que ante cualquier
     * cambio debera procesar nuevamente el item para que los cambios se persistan.
     */
    public rollbackProcesar(){
        this.modoEscritura = true;
        this.recargoAgente.procesado = false;
    }

}