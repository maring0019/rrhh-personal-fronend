import 'rxjs/add/operator/toPromise';

import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Plex } from '@andes/plex';

import  *  as formUtils from 'src/app/utils/formUtils';
import { HoraExtraFormComponent } from './form/hora-extra-form.component';

import { ModalService } from 'src/app/services/modal.service';
import { HoraExtraService } from 'src/app/services/horas-extras.service';

import { Agente } from 'src/app/models/Agente';
import { HoraExtra, HoraExtraItemPlanilla } from 'src/app/models/HoraExtra';


@Component({
    selector: 'app-hora-extra-create-update',
    templateUrl: './hora-extra-create-update.html'
  })
export class HoraExtraCreateUpdateComponent implements OnInit {
    @ViewChild("formComponent") formComponent: HoraExtraFormComponent;

    public isEditable = true;
    public horaExtra: HoraExtra;
    public generandoPlanilla: Boolean; // Bandera

    public get agenteSearchParams() {
        return this._extraSearchParams;
    }

    // Permisos
    public get puedeProcesar():Boolean{
        return (this.horaExtra && this.horaExtra.estado == '1');
    } 
    public get puedeGuardar():Boolean{
        return (this.horaExtra && !this.horaExtra.estado || this.horaExtra.estado == '0');
    }

    public get puedeConfirmar():Boolean{
        return this.puedeGuardar;
    }

    public get puedeAgregarAgente():Boolean{
        return (this.horaExtra && !this.horaExtra.estado || this.horaExtra.estado == '0' || this.horaExtra.estado == '1');
    }

    public get puedeEditarPlanilla():Boolean{
        return this.puedeAgregarAgente;
    }


    /**
     * Contiene los valores reales de los parametros extras a utilizar
     * en el componente de busqueda de agentes. Se completa al momento
     * de tener disponibles los datos del formulario del encabezado.
     */
    private _extraSearchParams:any; 
    
    private _objectID:any; // To keep track of object on update

    public agentesSeleccionados = []; // 

    constructor(
        private route: ActivatedRoute,
        protected location: Location,
        private plex: Plex,
        private horaExtraService: HoraExtraService,
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

    private prepareDataForCreate(){
        this.horaExtra = new HoraExtra();
    }

    private prepareDataForUpdate(){
        this.isEditable = false;
        this.horaExtraService.getByID(this._objectID)
            .subscribe(data => {
                this.horaExtra = new HoraExtra(data);
                // Actualizamos los agentes seleccionados. Este paso solo
                // es para evitar cargar agentes previamente cargados
                for (const item of this.horaExtra.planilla) {
                    this.agentesSeleccionados.push(item.agente);   
                }
                // Verificamos si la hora extra es editable
                if (this.horaExtra.estado == '0') this.isEditable = true;
            })
    }
    
    private remoteItemFromList(list, item){
        return list.filter(elem => elem._id != item._id);
    }

    public onRemoveItemPlanilla(event){
        this.agentesSeleccionados = this.remoteItemFromList(this.agentesSeleccionados, event.agente);
    }

    /**
     * Metodo que se ejecuta ante los cambios realizados en el formulario del
     * encabezado. Todos los cambios impactan sobre el modelo horas extras (this.horaExtra)
     * Si la planilla ya tenia informacion cargada sobre algun agente entonces
     * la misma se pierde ya que hay que regenerar la planilla si el usuario 
     * confirma los cambios.
     *  
     * @param newValue unicamente tiene informacion del ultimo campo modificado
     */
    public async onChangedHoraExtraForm(newValue:any){
        let form = this.formComponent.form;
        if (this.horaExtra.planilla.length > 0 ){
            this.plex.confirm(
                `Se van perder los datos ingresados en la planilla.
                ¿Desea Continuar?`)
                .then( confirm => {
                    if (confirm){
                        this.actualizarHoraExtra(newValue);
                    }
                    else{
                        // Hacemos un rollback de los cambios realizados al form
                        form.patchValue(
                            {
                                mes       : this.horaExtra.mes,
                                anio      : this.horaExtra.anio,
                                servicio  : this.horaExtra.servicio,
                            },
                            { emitEvent: false }); // Prevent infinite loop
                    }
            });
        }
        else{
            this.actualizarHoraExtra(newValue);
            await this.isHoraExtraUnique();
        }
    }

    
    private actualizarHoraExtra(changedValue:any){
        this.horaExtra.planilla = [];
        if ('mes' in changedValue || 'anio' in changedValue) {
            this.generandoPlanilla = true;
            this.horaExtra.mes = ('mes' in changedValue)? changedValue.mes:this.horaExtra.mes; 
            this.horaExtra.anio = ('anio' in changedValue)? changedValue.anio.id:this.horaExtra.anio;
        }
        else{
            // Actualizamos los datos de la hora extra con el valor modificado
            Object.keys(changedValue).forEach( key => {
                if (key == 'servicio') this.horaExtra.servicio = changedValue[key];
            });
        }
        window.setTimeout(() => {
            this.generandoPlanilla = false;
       }, 500);
    }

    private async isHoraExtraUnique(){
        if (this.horaExtra.servicio && this.horaExtra.mes && this.horaExtra.anio){
            const itemExistente = await this.findHoraExtra();
            if (itemExistente && !this._objectID ){
                this.infoHoraExtraDuplicado();
                return false;
            }

            if (itemExistente && this._objectID && itemExistente._id != this._objectID){
                this.infoHoraExtraDuplicado();
                return false;
            }
            return true;
        }

    }

    /**
     * Valida que esten presentes todos los datos del formulario.
     */
    private async isHoraExtraFormValid(){
        const form = this.formComponent.form;
        if (form.invalid){
            formUtils.markFormAsInvalid(form);
            this.plex.info('danger', 'Debe completar todos los datos obligatorios del encabezado');
            return false;
        }
        return true;
    }


    private async findHoraExtra(){
        const searchParams = {
            'anio': this.horaExtra.anio,
            'mes.id': this.horaExtra.mes.id,
            'servicio._id': this.horaExtra.servicio._id,
        } 
        const response = await this.horaExtraService.get(searchParams).toPromise();
        return (response.length)? response[0]:null;        
    }

    /**
     * Abre un modal con el componente de seleccion de agentes.El agente
     * que se selecciona se incorporara luego a la planilla de hora extras.
     */
    public async onAddAgente(){
        if ( await this.isHoraExtraFormValid()) {
            // this._extraSearchParams = {
            //     'situacionLaboral.cargo.servicio.ubicacion': this.form.value.servicio.codigo,
            //     'situacionLaboral.cargo.agrupamiento._id': this.form.value.categoria._id,
            //     'activo': true
            // }
            this.modalService.open('modal-add-agente');
        }
    }

    /**
     * Una vez seleccionado el/los agentes se crea una/s instancia/s de
     * HoraExtraItemPlanilla para agregar al listado general de horas extras.
     */
    public onAddAgenteSelected(agentes:Agente[]){
        this.agentesSeleccionados = this.agentesSeleccionados.concat(agentes);
        agentes.forEach(agente => {
            if (!this.horaExtra.planilla.some(e => e.agente._id === agente._id)){
                // Si el agente seleccionado aun no pertenece a la planilla
                // lo incorporamos
                this.horaExtra.planilla.push( new HoraExtraItemPlanilla({
                    agente: {
                        _id: agente._id,
                        nombre: agente.nombre,
                        apellido: agente.apellido,
                        numero: agente.numero
                    }
                }));
            }      
        });
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


    /**
     * Al momento de guardar verificamos si corresponde guardar un nuevo
     * hora extra, o guardar una hora extra existente que ha sido modificada.
     */
    public async onGuardar(){
        if (await this.isHoraExtraFormValid() && await this.isHoraExtraUnique()){
            return this._objectID? this.updateHoraExtra('guardar'): this.addHoraExtra('guardar');
        }
        
    }

    /**
     * Idem que guardar pero con la accion 'Confirmar'
     */
    public async onConfirmar(){
        if (await this.isHoraExtraFormValid() && await this.isHoraExtraUnique()){
            this.plex.confirm(`Al confirmar se habilita al Dpto. de Gestión de Personal
                a realizar las validaciones correspondientes para su aprobación final.
                Durante esta etapa no podrá volver a editar la información ingresada.`)
            .then( confirm => {
                if (confirm) return this._objectID? this.updateHoraExtra('confirmar'): this.addHoraExtra('confirmar');
            });
        }
    }

    public async onProcesar(){
        if (await this.isHoraExtraFormValid()){
            return this.updateHoraExtra('validar');
        }
    }

    public onCerrar(){
        this.location.back();
    }

    /**
     * Al momento de crear una hora extra se puede simplemente 'guardar' para
     * continuar posteriormente su edicion o se puede 'confirmar' para asi
     * dar un cierre a la misma y permitir los controles que deben realizar
     * otros sectores.
     * 
     * @param actionType  'guardar', 'confirmar'
     */
    private addHoraExtra(actionType:String){
        if (actionType == 'guardar'){
            this.horaExtraService.post(this.horaExtra)
                .subscribe( horaExtra => {
                    this.infoGuardarOk(horaExtra);
                })
        }
        else { // type == 'confirmar'
            this.horaExtraService.postAndConfirmar(this.horaExtra)
                .subscribe( horaExtra => {
                    this.infoConfirmarOk(horaExtra);
                })
        }
    }

    
     /**
     * Idem addHoraExtra
     * 
     * @param actionType  'guardar', 'confirmar', 'validar'
     */
    private updateHoraExtra(actionType:String){
        switch (actionType){
            case 'guardar':
                this.horaExtraService.put(this.horaExtra)
                    .subscribe( horaExtra => {
                        this.infoGuardarOk(horaExtra);
                    });
                break;
            case 'confirmar':
                this.horaExtraService.putAndConfirmar(this.horaExtra)
                    .subscribe( horaExtra => {
                        this.infoConfirmarOk(horaExtra);
                    });
                break;
            case 'validar':
                this.horaExtraService.putAndProcesar(this.horaExtra)
                    .subscribe( horaExtra => {
                        this.infoProcesarOk(horaExtra);
                    });
                break;
        }
    }

    private infoGuardarOk(horaExtra){
        this.plex
            .info('success', `Horas Extras Sin Confirmar guardadas correctamente. 
                    Puede continuar editando la información ingresada hasta
                    confirmar definitivamente los datos para ser evaluados 
                    por el Dpto. de Gestión de Personal.`)
            .then( confirm => {
                this.location.back();
            });
    }

    private infoConfirmarOk(horaExtra){
        this.plex
            .info('success', `Horas Extras guardadas y confirmadas correctamente.`)
            .then( confirm => { 
                this.location.back();
            });
    }

    private infoProcesarOk(horaExtra){
        this.plex
            .info('success', `HoraExtra procesado correctamente.`)
            .then( confirm => {
                this.location.back();
            });
    }

    private infoHoraExtraDuplicado(){
        this.plex.info('danger', `HoraExtra Duplicado. Los datos ingresados no podran ser almacenados.`);
    }

}