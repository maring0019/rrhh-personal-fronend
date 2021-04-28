import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recargo } from 'src/app/models/Recargo';
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
  
    public onProcesar(value){
        // Simplemente tomamos el valor del componente hijo y
        // lo pasamos hacia 'arriba' para que otro componente 
        // decida que hacer.
        this.procesar.emit(value);
    }

    /**
     * Si se eliminan todos los recargos de un agente, eliminamos al
     * agente de la planilla. Luego notificamos el evento hacia el exterior
     * @param recargo 
     * @param index 
     */
    public onRecargoDeleted(recargo, index){
        if (this.recargo.planilla[index].items.length == 0){
            const itemsDeleted = this.recargo.planilla.splice(index, 1);
            this.deleted.emit(itemsDeleted[0].agente)
        }
    }

}