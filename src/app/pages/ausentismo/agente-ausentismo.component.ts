import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Franco } from 'src/app/models/Franco';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';

import { getWeekdays } from 'src/app/utils/dates';
import { Agente } from 'src/app/models/Agente';
import { Plex } from '@andes/plex';


@Component({
    selector: 'app-agente-ausentismo',
    templateUrl: 'agente-ausentismo.html',
    styleUrls: ['./agente-ausentismo.scss']
})

export class AgenteAusentismoComponent implements OnInit {

    eventos: IAusenciaEvento[];
    ausencias: IAusenciaEvento[];
    feriados: IAusenciaEvento[];
    francos: IAusenciaEvento[];
    weekends: Boolean = true;
    mesMainDefault:Date = new Date();
    mesNavDefault:Date = new Date();
    ausentismoSeleccionado: Ausentismo = null;
    agenteID:any;
    public agente:Agente;
    // TODO: Analizar de enviar todas las opciones del calendario por esta variable
    options:any = {
        weekends: true,
        defaultDate: new Date()
    }

    storeSubscription: Subscription;

    constructor(
        private calendarStoreService: CalendarStoreService,
        private agenteService: AgenteService,
        protected plex: Plex,
        private route: ActivatedRoute,
        private router:Router){}
    
    public ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.agenteID = params['agenteId'];
                if (this.agenteID){
                    this.agenteService.getByID(this.agenteID).subscribe((data) => {
                        if (data){
                            this.agente = new Agente(data);
                            this.refreshEventos();
                        }
                    });
                }
                else{
                    this.plex.info('danger', 'No se pudo recuperar el agente indicado')
                        .then( e => {
                            // this.onClose();
                        });        
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

    onToggleWeekends(value){
        this.weekends = value;
    }

    onToggleFeriados(value){
        if (value){
            this.calendarStoreService.showFeriados();
        }
        else{
            this.calendarStoreService.hideFeriados();
        }
    }

    onToggleFrancos(value){
        let weekends = getWeekdays(this.mesNavDefault.getMonth(), this.mesNavDefault.getFullYear());
        if (value){
            let francos:Franco[] = weekends.map(f => f = {fecha:f, agente:{id:this.agenteID}});
            this.calendarStoreService.addFrancos(francos);
        }
        else{
            this.calendarStoreService.removeFrancos(weekends);
        }
    }

    onActivate(componentRef){
        console.log('Se activo el componente Interno');
        console.log(componentRef);
    }

    refreshEventos(){
        this.storeSubscription = this.calendarStoreService.getEventos(this.agenteID)
            .subscribe(eventos => this.eventos = eventos)
    }

    public onCargarAusentismo(){
        this.router.navigateByUrl(`/agentes/${this.agenteID}/ausencias/agregar`);
    }
    
}
