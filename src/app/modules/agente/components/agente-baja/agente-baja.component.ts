import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Agente } from 'src/app/models/Agente';
import { CausaBaja } from 'src/app/models/CausaBaja';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';

import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { CausaBajaService } from 'src/app/services/causa-baja.service';
import { AgenteService } from 'src/app/services/agente.service';
import { BajaAgente } from '../../../../models/BajaAgente';


@Component({
    selector: 'app-agente-baja',
    templateUrl: './agente-baja.html'
  })

export class AgenteBajaComponent{
    @Input() agente: Agente;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    public agenteBajaForm: FormGroup;
    public tiposNormaLegal: TipoNormaLegal[] = [];
    public causas: CausaBaja[] = [];

    
    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService,
        private causaService: CausaBajaService,
        private agenteService: AgenteService){}

        ngOnInit() {
            // Init Tipos Normas
            this.tipoNormaLegalService.get({})
                .subscribe(data => {
                    this.tiposNormaLegal = data;
            });
            // Init Causas de Bajas
            this.causaService.get({})
            .subscribe(data => {
                this.causas = data;
            });
            
            this.agenteBajaForm = this.createBajaAgenteForm(); 
        }
    
    createBajaAgenteForm()
        {
            return this.formBuilder.group({
                fecha              : [new Date()],
                causa              : [],
                tipoNormaLegal     : [],
                numeroNormaLegal   : [],
                observaciones      : []
            });
        }

    public cancelar(){
        this.cancel.emit();
    }

    public guardar(){
        const baja = new BajaAgente(this.agenteBajaForm.value);
        this.agenteService.baja(this.agente, baja)
            .subscribe(
                data=> this.success.emit(data),
                error => this.error.emit(error)
            )
    }

}