import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';

import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { Guardia, ItemGuardiaPlanilla } from 'src/app/models/Guardia';
import { GuardiaFormComponent } from './form/guardia-form.component';
import { ModalService } from 'src/app/services/modal.service';


@Component({
    selector: 'app-guardia-create-update',
    templateUrl: './guardia-create-update.html'
  })
export class GuardiaCreateUpdateComponent implements OnInit {
    @ViewChild("guardiaForm") guardiaForm: GuardiaFormComponent;

    public isEditable = true;
    public guardia: Guardia;

    public get agenteSearchParams() {
        return this._extraSearchParams;
    }

    /**
     * Contiene los valores reales de los parametros extras a utilizar
     * en el componente de busqueda de agentes. Se completa al momento
     * de tener disponibles los datos del formulario del encabezado.
     */
    private _extraSearchParams:any; 
    
    /**
     * Almacena una copia de los valores del formulario del encabezado
     * de la guardia. La copia se realiza unicamente cuando estan todos
     * los datos completos del form, y en el momento en que el usuario
     * comienza a cargar agentes a la planilla. Esta copia es utilizada
     * cuando es necesario restaurar los valores previos cargados, por
     * ejemplo ante la modificacion de un valor y posterior cancelacion
     * de la modificacion.
     */
    private _formFreezeValues: any;

    private _objectID:any; // To keep track of object on update

    constructor(
        private route: ActivatedRoute,
        private plex: Plex,
        private authService: Auth,
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
    }

    
    /**
     * 
     * @param previousValue 
     */
    public onChangedGuardiaForm(previousValue:any){
        if (this.guardia.planilla.length > 0 ){
            this.plex.confirm('Se van perder los datos ingresados en la planilla. ¿Desea Continuar?')
                .then( confirm => {
                    if (confirm){
                        this.guardia.planilla = [];
                    }
                    else{
                        // Hacemos un rollback de los cambios realizados al form
                        this.guardiaForm.form.patchValue(this._formFreezeValues, { emitEvent: false }); // Prevent infinite loop
                    }
            });
        }
    }

    /**
     * Abre un modal con el componente de seleccion de agentes.El agente
     * que se selecciona se incorporara luego a la planilla de guardias.
     * Los agentes a mostrar para seleccionar deben estar restringidos a 
     * los datos que se hayan ingresado en el encabezado (como por ej el
     * servicio y categoria)por esta razon antes de permitir seleccionar
     * agentes se valida que este presente la información necesaria.
     */
    public onAddAgente(){
        const form = this.guardiaForm.form;
        if (form.invalid){
            formUtils.markFormAsInvalid(form);
            this.plex.info('info', 'Debe completar todos los datos obligatorios del encabezado');
        }
        else {
            this._formFreezeValues = {...form.value};
            this._extraSearchParams = {
                'situacionLaboral.cargo.servicio.ubicacion': form.value.servicio.codigo,
                'situacionLaboral.cargo.agrupamiento._id': form.value.categoria.id,
                'activo': true
            }
            this.modalService.open('modal-add-agente');
        }
    }

    /**
     * Una vez seleccionado un agente se crea una instancia de
     * ItemGuardiaPlanilla  para agregar al listado general de
     * guardias. La instancia es importante porque contiene la
     * logica para contabilizar los dias de guardia del agente.
     */
    public onAddAgenteSelected(agente:Agente){
        if (!this.guardia.planilla.some(e => e.agente.id === agente.id)){
            // Si el agente seleccionado aun no pertenece a la planilla
            // lo incorporamos
            this.guardia.planilla.push( new ItemGuardiaPlanilla({
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
        }   
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
    
    //TODO: 
    //   OK. Ver como identificar en el html un dia completo o medio dia
    //   Ok. Ver al hacer click de agregar medio dia o dia completo 
    //   OK. Ver de No permitir hacer click en las celdas en donde no hay dias validos
    //   Ok. Ver de contabilizar correctamente la cantidad de dias de guardia por agente
    //   Ok. Ver de contabilizar las guardias por dia
    //   Ok. Remover un agente de la planilla de guardias
    //   Ok. Ver si es posible agregar info de contexto al pasar el mouse por arriba de una celda
    //   Ok. Ver de agregar un pointer al realizar un hover sobre las celdas
    //   Ok. Ver como agregar agentes a la plantilla. (Parametrizar filtros al buscador de agentes)

    //   Ver como armar la estructura necesaria para el html una vez consultado el servicio
    //   Ver de realizar validaciones segun alguna configuracion a definiar 
    //   Analizar si no es conveniente agregar info sobre el tipo de guardia en cada item de la planilla
    //   Ver como calcular los dias de un agente en otraaaas planillas para el mismo periodo?
    //  Incluir info de las ausencias!!!!


    

    
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
    
    

    

}