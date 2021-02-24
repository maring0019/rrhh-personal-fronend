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
            size: '19'
        },
        {
            id: 'fecha',
            title: 'Fecha',
            size: '16'
        },
        {
            id: 'turnos',
            title: 'Turnos',
            size: '20'
        },
        {
            id: 'justificacion',
            title: 'Justificación',
            size: '25'
        },
        {
            id: 'observaciones',
            title: 'Observaciones',
            size: '20'
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

    public addItem(agente, index){
        agente.items.push(new ItemPlanilla(agente))
        this.itemAdded.emit({item:agente, index:index})

    }

    public deleteItem(item, innerIndex, outterIndex){
        item.items.splice(innerIndex, 1);
        if (!item.items.length) this.deleted.emit({item:item, index:outterIndex});
    }

    // TODO
    // Validar entre lineas
    // Procesar
    // Permitir vista edicion. Deshabilitar componentes
    // Imprimir reporte


}