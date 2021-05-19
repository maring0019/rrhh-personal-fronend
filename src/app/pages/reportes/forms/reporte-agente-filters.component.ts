import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ubicacion } from 'src/app/models/Ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
    selector: 'app-reporte-agente-filters',
    templateUrl: './reporte-agente-filters.html',
})
export class ReporteAgenteFiltersComponent implements OnInit, OnDestroy {

    @Input() serviciosAllowed: Ubicacion[];

    public form: FormGroup;
    private timeoutHandle: number;
    

    public formRadioOptions = {
        'all'    : [{ id: true, label: 'Todos los Agentes' }],
        'one'    : [{ id: true, label: 'Sólo el agente'}],
        'trabajo':[{ id: true, label: 'Agentes con Lugar de Trabajo en:'}]
    }

    public opcionesAgenteTodos;
    public opcionesAgenteLugarTrabajo;
    public opcionesAgente;
    public opcionesServicios;
    public filtrosTiposEstados;

    constructor(
        private formBuilder: FormBuilder,
        private ubicacionService: UbicacionService,
        ){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initAgenteFilterForm();
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    private initFormSelectOptions(){
        // Radio buttons options. Se crean individualmente para tener mayor 
        // control en el layout del html. Esto implica luego gestionar cada
        // evento de seleccion manualmentes ya que las opciones son excluyentes
        this.opcionesAgenteTodos = [{ id: true, label: 'Todos los Agentes' }];
        this.opcionesAgenteLugarTrabajo = [{ id: true, label: 'Agentes con Trabajo en:'}];
        this.opcionesAgente = [{ id: true, label: 'Sólo el agente:'}];
        
        this.filtrosTiposEstados =[
            {id:'activo', nombre:'Sólo agentes activos'},
            {id:'baja', nombre:'Sólo agentes inactivos'},
            {id:'todos', nombre:'Todos (activos e inactivos)'}
        ];

        
        // Inicializamos las ubicaciones/servicios disponibles para filtrar
        if (this.serviciosAllowed && this.serviciosAllowed.length){
            this.opcionesServicios = this.serviciosAllowed;
        }
        else{
            // Si serviciosAllowed = [], implica que tiene acceso a todos los
            // servicios.
            this.ubicacionService.get({}).subscribe(servicios =>
                this.opcionesServicios = servicios)
        }       
        
    }

    initAgenteFilterForm()
    {
        return this.formBuilder.group({
            // Radio buttons options
            optionAgenteTodos        : [true],
            optionAgenteLugarTrabajo : [],
            optionAgente             : [],
            // Filter options
            ubicacion                : [],
            agente                   : [],
            activo                   : [{id:'activo', nombre:'Sólo agentes activos'}]
        });
    }

    prepareSearchParams(){
        let params:any = {};
        let form = this.form.value;
        // Filters
        if (form.optionAgenteLugarTrabajo){
            params['situacionLaboral.cargo.sector.ubicacion'] = form.ubicacion.codigo;
        }
        if (form.optionAgente){
            params['_id'] = form.agente._id;
        }
        if (!form.optionAgenteLugarTrabajo && !form.optionAgente && this.serviciosAllowed.length){
            // Controlamos que solo pueda filtrar por los servicios permitidos
            params['situacionLaboral.cargo.sector.ubicacion'] = this.serviciosAllowed.map(i=>i.codigo);
        }
        if (form.activo){
            if (form.activo.id == 'activo') params['activo'] = true;
            if (form.activo.id == 'baja') params['activo!'] = true;
        }
        return params;
    }


    public onChangeAgente(e){
        if (e && e.value) this.updateRadioOptionSelection('optionAgente');
    }

    public onChangeLugarTrabajo(e){
        if (e && e.value) this.updateRadioOptionSelection('optionAgenteLugarTrabajo');
    }

    public updateRadioOptionSelection(optionSelected:string){
        let opciones = ['optionAgenteTodos', 'optionAgenteLugarTrabajo', 'optionAgente'];
        for (const opt of opciones){
            if (opt == optionSelected){
                this.form.controls[opt].setValue(true);
            } 
            else{
                this.form.controls[opt].setValue(false);
            }
        }
    }
}
