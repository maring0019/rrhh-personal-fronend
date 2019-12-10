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
                this.guardia = new Guardia(data);
                if (this.guardia.estado == '0') this.isEditable = true;
            })
    }

    
    /**
     * Metodo que se ejecuta ante los cambios realizados en el formulario del
     * encabezado. Todos los cambios impactan sobre el modelo guardia (this.guardia)
     * La modificacion del campo periodo del formulario tiene un tratamiento
     * especial ya que si el usuario confirma el cambio entonces se vuelva a
     * generar la planilla y se pierde la información de los agentes previamente
     * cargados.
     *  
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
                        this.regenerarGuardia(newValue);
                    }
                    else{
                        // Hacemos un rollback de los cambios realizados al form
                        this.guardiaForm.form.patchValue(
                            {
                                periodo : this.guardia.periodo,
                                servicio : this.guardia.servicio,
                                categoria : this.guardia.categoria,
                                tipoGuardia : this.guardia.tipoGuardia
                            },
                            { emitEvent: false }); // Prevent infinite loop
                    }
            });
        }
        else{
            this.regenerarGuardia(newValue);
        }
    }

    
    private regenerarGuardia( newValue:any ){
        if ('periodo' in newValue) {
            this.generandoPlanilla = true;
            this.guardia = new Guardia({ periodo: newValue.periodo });
        }
        // Actualizamos la guardia con el valor ingresado
        Object.keys(newValue).forEach( key => {
            // Horrible
            if (key == 'servicio') this.guardia.servicio = newValue[key];
            if (key == 'categoria') this.guardia.categoria = newValue[key];
            if (key == 'tipoGuardia') this.guardia.tipoGuardia = newValue[key].id;
        });
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


    /**
     * Al momento de guardar verificamos si corresponde guardar una nueva 
     * guardia, o guardar una guardia existente que ha sido modificada.
     */
    public onGuardar(){
        return this._objectID? this.updateGuardia('guardar'): this.addGuardia('guardar');
    }

    /**
     * Idem que guardar pero con la accion 'Confirmar'
     */
    public onConfirmar(){
        if (this.isGuardiaFormValid()){
            this.plex.confirm(`Al confirmar se habilita al Dpto. de Gestión de Personal
                a realizar las validaciones correspondientes para su aprobación final.
                Durante esta etapa no podrá volver a editar la información ingresada.`)
            .then( confirm => {
                if (confirm) return this._objectID? this.updateGuardia('confirmar'): this.addGuardia('confirmar');
            });
        }
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
        if (this.isGuardiaFormValid()){
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
    }

    
     /**
     * Idem addGuardia
     * 
     * @param actionType  'guardar', 'confirmar'
     */
    private updateGuardia(actionType:String){
        if (this.isGuardiaFormValid()){
            if (actionType == 'guardar'){
                this.guardiaService.put(this.guardia)
                    .subscribe( guardia => {
                        this.infoGuardarOk(guardia);
                    })
            }
            else { // type == 'confirmar'
                this.guardiaService.putAndConfirmar(this.guardia)
                    .subscribe( guardia => {
                        this.infoConfirmarOk(guardia);
                    })

            }
        }
    }

    private infoGuardarOk(guardia){
        this.plex
            .info('success', `Guardia guardada correctamente. 
                    Puede continuar editando la información ingresada hasta
                    confirmar definitivamente los datos para ser evaluados 
                    por el Dpto. de Gestión de Personal.`)
            .then( confirm => {
                this.router.navigate(['/guardias' , { id: guardia.id? guardia.id : guardia._id }]);
                this.ngOnInit();
                // this.prepareDataForUpdate();
            });
    }

    private infoConfirmarOk(guardia){
        this.plex
            .info('success', `Guardia guardada y confirmada correctamente.`)
            .then( confirm => { 
                this.router.navigate(['/guardias' , { id: guardia.id? guardia.id : guardia._id }]);
                this.ngOnInit();
            });
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