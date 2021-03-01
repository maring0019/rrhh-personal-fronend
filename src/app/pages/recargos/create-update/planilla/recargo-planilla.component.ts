import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recargo, ItemPlanilla } from 'src/app/models/Recargo';
import { RecargoJustificacionService } from 'src/app/services/recargo-justificacion.service';
import { RecargoTurnoService } from 'src/app/services/recargo-turno.service';


@Component({
    selector: 'app-recargo-planilla',
    templateUrl: './recargo-planilla.html'
  })
export class RecargoPlanillaComponent implements OnInit {

    @Input() recargo: Recargo;
    @Input() editable: Boolean = true;

    @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() procesar: EventEmitter<any> = new EventEmitter<any>();
    @Output() itemAdded: EventEmitter<any> = new EventEmitter<any>();

    public justificacionOpciones = [];
    public turnoOpciones = [];

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

    constructor(private recargoJustificacionService: RecargoJustificacionService,
        private recargoTurnoService: RecargoTurnoService) {}

    ngOnInit(){
        this.recargoJustificacionService.get({})
            .subscribe(data => {
                this.justificacionOpciones = data
            })
        this.recargoTurnoService.get({})
            .subscribe(data => {
                this.turnoOpciones = data
            })
    }

    public addItem(item, index){
        this.rollbackProcesar(item)
        item.items.push(new ItemPlanilla(item))
        this.itemAdded.emit({item:item, index:index})
    }

    public deleteItem(item, innerIndex, outterIndex){
        this.rollbackProcesar(item);
        item.items.splice(innerIndex, 1);
        if (!item.items.length) this.deleted.emit({item:item, index:outterIndex});
    }

    public changeProcesado(value){
        this.procesar.emit(value);
    }

    /**
     * Cada vez que se produce un cambio en los datos de un agente, marcamos los
     * datos de ese agente como no procesado.
     * Esto es particularmente util para el area de personal, ya que ante cualquier
     * cambio debera procesar nuevamente el item para que los cambios se persistan.
     * @param item es un item/agente de la planilla. No es una fila en particular
     */
    public rollbackProcesar(item){
        item.procesado = false;
    }

    // TODO
    // Validar entre lineas
    // Procesar
    // Permitir vista edicion. Deshabilitar componentes
    // Imprimir reporte


}