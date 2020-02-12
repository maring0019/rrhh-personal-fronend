import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';

import 'rxjs/add/operator/toPromise';
import  *  as formUtils from 'src/app/utils/formUtils';

import { ModalService } from 'src/app/services/modal.service';
import { GuardiaService } from 'src/app/services/guardia.service';
import { GuardiaLoteService } from 'src/app/services/guardia-lote.service';

import { Agente } from 'src/app/models/Agente';
import { Guardia, ItemGuardiaPlanilla } from 'src/app/models/Guardia';
import { GuardiaFormComponent } from './form/guardia-form.component';
import { GuardiaPeriodo } from 'src/app/models/GuardiaPeriodos';


@Component({
    selector: 'app-guardia-create-update',
    templateUrl: './guardia-create-update.html'
  })
export class GuardiaCreateUpdateComponent implements OnInit {
    @ViewChild("guardiaForm") guardiaForm: GuardiaFormComponent;

    // Permisos
    public puedeGuardar: Boolean;
    public puedeConfirmar: Boolean;
    public puedeValidar: Boolean;
    public puedeEditarPlanilla: Boolean;
    public puedeAgregarAgente: Boolean;

    public isEditable = true;
    public guardia: Guardia;
    public generandoPlanilla: Boolean; // Bandera

    public get agenteSearchParams() {
        return this._extraSearchParams;
    }

    /**
     * Contiene los valores reales de los parametros extras a utilizar
     * en el componente de busqueda de agentes. Se completa al momento
     * de tener disponibles los datos del formulario del encabezado.
     */
    private _extraSearchParams:any; 
    
    private _objectID:any; // To keep track of object on update

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private plex: Plex,
        private authService: Auth,
        private guardiaService: GuardiaService,
        private guardiaLoteService: GuardiaLoteService,
        private modalService: ModalService)
        {}

    ngOnInit(){
        console.log('Vamos a probar la seguridad')
        console.log('Usuario');
        console.log(this.authService.usuario)
        console.log('Permisos');
        console.log(this.authService.getPermissions('guardia:guardia:?'));
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
        this.guardia = new Guardia();
        this.preparePermisos();
    }

    private prepareDataForUpdate(){
        this.isEditable = false;
        this.guardiaService.getByID(this._objectID)
            .subscribe(data => {
                this.guardia = new Guardia(data);
                this.preparePermisos();
                if (this.guardia.estado == '0') this.isEditable = true;
            })
    }

    private hasPerm(permiso:string){
        return true;
    }

    /**
     * Metodo temporal para determinar las acciones disponibles
     */
    private preparePermisos(){
        this.puedeValidar = this.guardia.estado == '1' && this.hasPerm('puedeValidar');
        this.puedeGuardar = (!this.guardia.estado || this.guardia.estado == '0') && this.hasPerm('puedeGuardar');
        this.puedeConfirmar = (!this.guardia.estado || this.guardia.estado == '0') && this.hasPerm('puedeConfirmar');
        this.puedeEditarPlanilla =  (!this.guardia.estado || this.guardia.estado == '0' || this.guardia.estado == '1') && this.hasPerm('');
        this.puedeAgregarAgente =  (!this.guardia.estado || this.guardia.estado == '0' || this.guardia.estado == '1') && this.hasPerm('');
    }

    
    /**
     * Metodo que se ejecuta ante los cambios realizados en el formulario del
     * encabezado. Todos los cambios impactan sobre el modelo guardia (this.guardia)
     * Si la planilla ya tenia informacion cargada sobre algun agente entonces
     * la misma se pierde ya que hay que regenerar la planilla si el usuario 
     * confirma los cambios.
     *  
     * @param newValue unicamente tiene informacion del ultimo campo modificado
     */
    public onChangedGuardiaForm(newValue:any){
        if (this.guardia.planilla.length > 0 ){
            this.plex.confirm(
                `Se van perder los datos ingresados en la planilla.
                ¿Desea Continuar?`)
                .then( confirm => {
                    if (confirm){
                        this.actualizarGuardia(newValue);
                    }
                    else{
                        // Hacemos un rollback de los cambios realizados al form
                        this.guardiaForm.form.patchValue(
                            {
                                periodo : this.guardia.periodo,
                                servicio : this.guardia.lote.servicio,
                                categoria : this.guardia.lote.categoria,
                                tipoGuardia : this.guardia.lote.tipoGuardia
                            },
                            { emitEvent: false }); // Prevent infinite loop
                    }
            });
        }
        else{
            this.actualizarGuardia(newValue);
        }
    }

    
    private async actualizarGuardia( changedValue:any ){
        this.guardia.planilla = [];
        if ('periodo' in changedValue) {
            this.generandoPlanilla = true;
            // Creamos una nueva instancia del periodo para regenerar el 
            // rango de fechas nuevamente.
            this.guardia.periodo = new GuardiaPeriodo(changedValue.periodo); 
        }
        else{
            // Actualizamos los datos del lote de la guardia con el valor ingresado
            Object.keys(changedValue).forEach( key => {
                // Horrible
                if (key == 'servicio') this.guardia.lote.servicio = changedValue[key];
                if (key == 'categoria') this.guardia.lote.categoria = changedValue[key];
                if (key == 'tipoGuardia') this.guardia.lote.tipoGuardia = changedValue[key]? changedValue[key].id: null;
            });
        }
        // Si estan todos los datos presentes del lote entonces validamos que
        // realmente existe un lote con esos datos
        if (this.guardia.lote.servicio && this.guardia.lote.categoria && this.guardia.lote.tipoGuardia){
            const lote = await this.findLoteGuardia();
            if (lote){
                this.guardia.lote = lote;
            }
            else{
                this.infoLoteInvalido();
            }
        }
        window.setTimeout(() => {
             this.generandoPlanilla = false;
        }, 500);
    }

    /**
     * Valida que esten presentes todos los datos del formulario.
     * Ademas valida que el servicio, categoria y tipo de guardia
     * corresponda con un lote existente. Si el lote no existe no
     * se puede crear la guardia.
     */
    private async isGuardiaFormValid(){
        const form = this.guardiaForm.form;
        if (form.invalid){
            formUtils.markFormAsInvalid(form);
            this.plex.info('danger', 'Debe completar todos los datos obligatorios del encabezado');
            return false;
        }
        // Validamos tambien la existencia del lote
        const loteSearchParams = {
            'servicio._id': form.value.servicio._id,
            'categoria._id': form.value.categoria._id,
            'tipoGuardia': form.value.tipoGuardia.id
        }
        const response = await this.guardiaLoteService.get(loteSearchParams).toPromise();
        if (!response.length){
            this.infoLoteInvalido();
            return false;
        }
        return true;
    }


    private async findLoteGuardia(){
        const loteSearchParams = {
            'servicio._id': this.guardia.lote.servicio._id,
            'categoria._id': this.guardia.lote.categoria._id,
            'tipoGuardia': this.guardia.lote.tipoGuardia
        }      
        const response = await this.guardiaLoteService.get(loteSearchParams).toPromise();
        return (response.length)? response[0]:null;
    }

    /**
     * Abre un modal con el componente de seleccion de agentes.El agente
     * que se selecciona se incorporara luego a la planilla de guardias.
     * Los agentes a mostrar para seleccionar deben estar restringidos a 
     * los datos que se hayan ingresado en el encabezado (como por ej el
     * servicio y categoria)por esta razon antes de permitir seleccionar
     * agentes se valida que este presente la información necesaria.
     */
    public async onAddAgente(){
        const form = this.guardiaForm.form;
        if ( await this.isGuardiaFormValid()) {
            this._extraSearchParams = {
                'situacionLaboral.cargo.servicio.ubicacion': form.value.servicio.codigo,
                'situacionLaboral.cargo.agrupamiento._id': form.value.categoria._id,
                'activo': true
            }
            this.modalService.open('modal-add-agente');
        }
    }

    /**
     * Una vez seleccionado el/los agentes se crea una/s instancia/s de
     * ItemGuardiaPlanilla para agregar al listado general de guardias.
     * La instancia es importante porque contiene la logica necesaria que
     * contabiliza los dias de guardia del agente.
     */
    public onAddAgenteSelected(agentes:Agente[]){
        agentes.forEach(agente => {
            if (!this.guardia.planilla.some(e => e.agente._id === agente._id)){
                // Si el agente seleccionado aun no pertenece a la planilla
                // lo incorporamos
                this.guardia.planilla.push( new ItemGuardiaPlanilla({
                    agente: 
                        {
                            _id: agente._id,
                            nombre: agente.nombre,
                            apellido: agente.apellido,
                            numero: agente.numero
                        },
                    diasGuardia: [],
                    totalDias: 0
                }));
            }      
        });
         
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


    /**
     * Al momento de guardar verificamos si corresponde guardar una nueva 
     * guardia, o guardar una guardia existente que ha sido modificada.
     */
    public async onGuardar(){
        if (await this.isGuardiaFormValid()){
            return this._objectID? this.updateGuardia('guardar'): this.addGuardia('guardar');
        }
        
    }

    /**
     * Idem que guardar pero con la accion 'Confirmar'
     */
    public async onConfirmar(){
        if (await this.isGuardiaFormValid()){
            this.plex.confirm(`Al confirmar se habilita al Dpto. de Gestión de Personal
                a realizar las validaciones correspondientes para su aprobación final.
                Durante esta etapa no podrá volver a editar la información ingresada.`)
            .then( confirm => {
                if (confirm) return this._objectID? this.updateGuardia('confirmar'): this.addGuardia('confirmar');
            });
        }
    }

    public async onValidar(){
        if (await this.isGuardiaFormValid()){
            return this.updateGuardia('validar');
        }
    }

    public onCerrar(){
        this.router.navigate(['/guardias']);
    }

    /**
     * Al momento de crear una guardia se puede simplemente 'guardar' para
     * continuar posteriormente su edicion o se puede 'confirmar' para asi
     * dar un cierre a la misma y permitir los controles que deben realizar
     * otros sectores.
     * 
     * @param actionType  'guardar', 'confirmar'
     */
    private addGuardia(actionType:String){
        // TODO Como asignamos el agente.  this.guardia.responsableEntrega = this.authService.usuario;
        if (actionType == 'guardar'){
            this.guardiaService.post(this.guardia)
                .subscribe( guardia => {
                    this.infoGuardarOk(guardia);
                })
        }
        else { // type == 'confirmar'
            this.guardiaService.postAndConfirmar(this.guardia)
                .subscribe( guardia => {
                    this.infoConfirmarOk(guardia);
                })
        }
    }

    
     /**
     * Idem addGuardia
     * 
     * @param actionType  'guardar', 'confirmar', 'validar'
     */
    private updateGuardia(actionType:String){
        switch (actionType){
            case 'guardar':
                this.guardiaService.put(this.guardia)
                    .subscribe( guardia => {
                        this.infoGuardarOk(guardia);
                    });
                break;
            case 'confirmar':
                this.guardiaService.putAndConfirmar(this.guardia)
                    .subscribe( guardia => {
                        this.infoConfirmarOk(guardia);
                    });
                break;
            case 'validar':
                this.guardiaService.putAndValidar(this.guardia)
                    .subscribe( guardia => {
                        this.infoValidarOk(guardia);
                    });
                break;
        }
    }

    private infoGuardarOk(guardia){
        this.plex
            .info('success', `Guardia guardada correctamente. 
                    Puede continuar editando la información ingresada hasta
                    confirmar definitivamente los datos para ser evaluados 
                    por el Dpto. de Gestión de Personal.`)
            .then( confirm => {
                this.router.navigate(['/guardias/editar/' + guardia._id]);
                this.ngOnInit();
            });
    }

    private infoConfirmarOk(guardia){
        this.plex
            .info('success', `Guardia guardada y confirmada correctamente.`)
            .then( confirm => { 
                this.router.navigate(['/guardias']);
            });
    }

    private infoValidarOk(guardia){
        this.plex
            .info('success', `Guardia guardada y validada correctamente.`)
            .then( confirm => { 
                this.router.navigate(['/guardias']);
            });
    }

    private infoLoteInvalido(){
        this.plex.info('danger', `Lote Inválido. Verifique que el Servicio, 
                                    Categoría y Tipo de Guardia pertenezcan
                                    a un Lote existente.`);
    }



    
    //TODO: 
    //   Ver de realizar validaciones segun alguna configuracion a definiar 
    //   Ver como calcular los dias de un agente en otraaaas planillas para el mismo periodo?
    //   Incluir info de las ausencias!!!!
    

}