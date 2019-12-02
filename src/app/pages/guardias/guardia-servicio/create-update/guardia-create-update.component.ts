import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Guardia, GuardiaPlanilla } from 'src/app/models/Guardia';
import { ModalService } from 'src/app/services/modal.service';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-guardia-create-update',
    templateUrl: './guardia-create-update.html'
  })
export class GuardiaCreateUpdateComponent implements OnInit {

    public isEditable = true;
    public guardia: Guardia;
    
    private _objectID:any; // To keep track of object on update

    constructor(
        private route: ActivatedRoute,
        private modalService: ModalService)
        {}

    ngOnInit(){

        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.prepareDataForUpdate();
            }
            else{
                this.prepareDataForCreate();
            }
        });

    }

    private prepareDataForUpdate(){
        this.isEditable = false;
        // this.agenteService.getByID(this._agenteID).subscribe((data) => {
        //     if (data){
        //         this.agente = new Agente(data);
        //         this.agenteDetalle = new Agente(data);
        //         this.initValueForms();
        //     }else{
        //         this.plex.info('info', 'El agente que desea editar no existe!')
        //             .then( e => {
        //                 this.volverInicio();
        //         });
        //     }
        // });
    }
    
    //TODO: 
    //   OK. Ver como identificar en el html un dia completo o medio dia
    //   Ok. Ver al hacer click de agregar medio dia o dia completo 
    //   OK. Ver de No permitir hacer click en las celdas en donde no hay dias validos
    //   Ok. Ver de contabilizar correctamente la cantidad de dias de guardia por agente
    //   Ok. Ver de contabilizar las guardias por dia
    //   Ok. Remover un agente de la planilla de guardias
    //   Ok. Ver si es posible agregar info de contexto al pasar el mouse por arriba de una celda
    //   Ver como agregar agentes a la plantilla. (Parametrizar filtros al buscador de agentes)

    //   Ver como armar la estructura necesaria para el html una vez consultado el servicio
    //   Ver de realizar validaciones segun alguna configuracion a definiar 
    //   Analizar si no es conveniente agregar info sobre el tipo de guardia en cada item de la planilla
    
    //   Ver de agregar un pointer al realizar un hover sobre las celdas
    //   Ver como calcular los dias de un agente en otraaaas planillas para el mismo periodo?


    

    
    private prepareDataForCreate(){
        let mock = {
            periodo :
                {
                    fechaDesde: new Date('2019-02-16'),
                    fechaHasta: new Date('2019-03-15'),
                },
            planilla : 
                [
                    {
                        agente: { nombre: "Mariana", apellido: "Vazquez Diaz", numero: "15345"},
                        diasGuardia: [
                            { 
                                fecha: new Date('2019-02-16'),
                                diaCompleto: false
                            },
                            { 
                                fecha: new Date('2019-02-17'),
                                diaCompleto: true
                            },
                            null, null, null, null, null, null,
                            {
                                fecha: new Date('2019-03-01'),
                                diaCompleto: true
                            } 
                        ]
                    },
                    
                    {
                        agente: { nombre: "Ana Paula Luisa", apellido: "Reva", numero: "32455"},
                        diasGuardia: []
                    },
                    {
                        agente: { nombre: "Marcela Adriana", apellido: "Jara", numero: "55343"},
                        diasGuardia: []
                    }
                ]
        }
        this.guardia = new Guardia(mock);
    }
    
    

    /**
     * Inicia el proceso de carga de agente para las guardias,
     * abriendo simplemente el modal de seleccion de agentes.
     */
    public onAddAgenteSearch(){
        this.modalService.open('modal-add-agente');
    }

    /**
     * Una vez seleccionado un agente se crea una instancia de
     * la planilla para agregar al listado general de guardias
     */
    public onAddAgenteSelected(agente:Agente){
        this.guardia.planilla.push( new GuardiaPlanilla({
            agente: 
                {
                    id: agente.id,
                    nombre: agente.nombre,
                    apellido: agente.apellido,
                    numero: agente.numero
                },
            diasGuardia: [],
            totalDias: 0
        }));
        this.closeModal();
    }

    /**
     * Si se cancela la busqueda de agentes, cerramos el modal.
     */
    public onAddAgenteCancel(){
        this.closeModal()
    }

    public closeModal(){
        this.modalService.close('modal-add-agente');
    }

}