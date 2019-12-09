import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';

import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { Guardia, ItemGuardiaPlanilla } from 'src/app/models/Guardia';
import { GuardiaFormComponent } from './form/guardia-form.component';

import { ModalService } from 'src/app/services/modal.service';
import { GuardiaService } from 'src/app/services/guardia.service';


@Component({
    selector: 'app-guardia-create-update',
    templateUrl: './guardia-create-update.html'
  })
export class GuardiaCreateUpdateComponent implements OnInit {
    @ViewChild("guardiaForm") guardiaForm: GuardiaFormComponent;

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
        private router: Router,
        private plex: Plex,
        private authService: Auth,
        private guardiaService: GuardiaService,
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
        this.guardia = new Guardia();
    }

    private prepareDataForUpdate(){
        this.isEditable = false;
        this.guardiaService.getByID(this._objectID)
            .subscribe(data => {
                console.log('Estamos volviendo de buscar por id');
                console.log(data);
                this.guardia = new Guardia(data);
            })
    }

    
    /**
     * Metodo que se ejecuta ante los cambios realizados en el form del encabezado.
     * Si los cambios afectan los agentes seleccionados se solicita confirmacion 
     * para continuar. Si se modifica el periodo la planilla siempre se debe volver
     * a generar
     * @param previousValue unicamente tiene informacion del ultimo campo modificado
     */
    public onChangedGuardiaForm(newValue:any){
        if (this.guardia.planilla.length > 0 ){
            this.plex.confirm(
                `Se van perder los datos ingresados en la planilla.
                ¿Desea Continuar?`)
                .then( confirm => {
                    if (confirm){
                        this.guardia.planilla = [];
                        if ('periodo' in newValue) this.regenerarPlanillaGuardia(newValue.periodo);
                    }
                    else{
                        // Hacemos un rollback de los cambios realizados al form
                        this.guardiaForm.form.patchValue(this._formFreezeValues, { emitEvent: false }); // Prevent infinite loop
                    }
            });
        }
        else{
            if ('periodo' in newValue) this.regenerarPlanillaGuardia(newValue.periodo);
        }
    }

    private regenerarPlanillaGuardia( periodo? ){
        this.generandoPlanilla = true;
        this.guardia = new Guardia({ periodo: periodo })
        window.setTimeout(() => {
            this.generandoPlanilla = false;
        }, 1000);
        
    }

    private isGuardiaFormValid(){
        const form = this.guardiaForm.form;
        if (form.invalid){
            formUtils.markFormAsInvalid(form);
            this.plex.info('danger', 'Debe completar todos los datos obligatorios del encabezado');
            return false;
        }
        return true;
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
        if (this.isGuardiaFormValid()) {
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
     * Una vez seleccionado el/los agentes se crea una/s instancia/s de
     * ItemGuardiaPlanilla para agregar al listado general de guardias.
     * La instancia es importante porque contiene la logica necesaria que
     * contabiliza los dias de guardia del agente.
     */
    public onAddAgenteSelected(agentes:Agente[]){
        agentes.forEach(agente => {
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


    public onGuardar(){
        this.save('guardar');
    }

    public onConfirmar(){
        if (this.isGuardiaFormValid()){
            this.plex.confirm(`Al confirmar se habilita al Dpto. de Gestión de Personal
                a realizar las validaciones correspondientes para su aprobación final.
                Durante esta etapa no podrá volver a editar la información ingresada.`)
            .then( confirm => {
                if (confirm){
                    this.save('confirm');
                }
            });
        }
    }

    private save(type:String){
        if (this.isGuardiaFormValid()){
            // Cargamos los datos del formulario al objeto Guardia
            // para finalmente guardar los cambios realizados
            const form = this.guardiaForm.form;
            this.guardia.servicio = form.value.servicio;
            this.guardia.categoria = form.value.categoria;
            this.guardia.tipoGuardia = form.value.tipoGuardia.id; //
            // TODO Como asignamos el agente?
            // this.guardia.responsableEntrega = this.authService.usuario;
            this.guardiaService.post(this.guardia)
                .subscribe( newGuardia => {
                    if (type == 'guardar') this.infoGuardarOk(newGuardia);
                })
        }
    }

    private infoGuardarOk(guardia){
        this.plex
            .info('success', `Guardia guardada correctamente. 
                    Puede continuar editando la información ingresada hasta
                    confirmar definitivamente los datos para ser evaluados 
                    por el Dpto. de Gestión de Personal.`)
            .then( confirm => { 
                this.router.navigate(['/guardias' , { id: guardia.id }]);
                console.log('Estamos en el then!!!!!!!!')
            });
    }

    private infoConfirmarOk(){

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
    

}