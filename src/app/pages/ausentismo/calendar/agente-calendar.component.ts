import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

import { Agente } from 'src/app/models/Agente';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';


export interface DateRangeSelection {
    fechaDesde: Date,
    fechaHasta: Date
}

@Component({
    selector: 'app-agente-calendar',
    templateUrl: 'agente-calendar.html',
    styleUrls: ['./agente-calendar.scss']
})

export class AgenteCalendarComponent implements OnInit {
    // @Input() agente: Agente;
    ausencias: IAusenciaEvento[];
    weekends: Boolean = true;
    mesMainDefault:Date = new Date();
    mesNavDefault:Date = new Date();
    dateRangeSelection: DateRangeSelection;
    ausentismoSeleccionado: Ausentismo = null;
    
    // TODO: Analizar de enviar todas las opciones del calendario por esta variable
    options:any = {
        weekends: true,
        defaultDate: new Date()
    }

    constructor(private route: ActivatedRoute, private agenteService:AgenteService){}
    
    public ngOnInit() {
        console.log('Estamos en el init de AgenteCalendarComponent')
        this.route.params.subscribe(
            params =>{
                const agenteID = params['agenteId'];
                if (agenteID){
                    this.agenteService.getAusencias(agenteID).subscribe((data) => {
                            // this.ausencias = data;
                        });
                }
                else{
                    console.log('No agenteID de los parametros')
                    // this.volverInicio();
                }
            }
        );
    }


    onChangeNavDate(date){
        this.mesMainDefault = new Date(date);
    }

    onChangeMainDate(date){
        this.mesNavDefault = new Date(date);
    }

    onChangeHeaderDate(date){
        this.mesMainDefault = new Date(date);
        this.mesNavDefault = new Date(date);
    }

    onChangeHeaderWeekends(value){
        this.weekends = value;
    }

    onChangedAusentismo(value){
        // this.agente = new Agente(this.agente);
        // if (ausencias && ausencias.length){
        //     this.ausencias = this.ausencias.concat(ausencias); // Creates a new array!
        // }
    }

    onAusentismoSelected(ausentismo){
        this.ausentismoSeleccionado = ausentismo;
        if (ausentismo){
            this.dateRangeSelection = {
                fechaDesde: ausentismo.fechaDesde,
                fechaHasta: ausentismo.fechaHasta
            }
        }
        else {
            this.resetDateRange();
        }
    }

    onCancelCarga(){
        this.resetDateRange();
    }

    onChangedDateRange(newRange:DateRangeSelection){
        this.dateRangeSelection = newRange;
    }

    resetDateRange(){
        this.dateRangeSelection = null;
    }

    onActivate(componentRef){
        // componentRef.ausentismoSelected.subscribe((value) => {
        //     // Will receive the data from child here 
        //     this.onAusentismoSelected(value);
        // })
        console.log('Se activo el componente interno');
        console.log(componentRef);
    }
}
