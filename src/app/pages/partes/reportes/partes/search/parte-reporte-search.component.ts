import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-parte-reporte-search-form',
    templateUrl: 'parte-reporte-search.html',
})
export class ParteReporteSearchFormComponent extends ABMSearchComponent implements OnInit, AfterViewInit {

    // Permisos especiales. Si el usuario logueado dispone de este permiso podra
    // consultar libremente en el modulo. Caso contrario estará restringido a los 
    // servicios disponibles como jefe de servicio/dpto/etc.    
    public canProcesarParte:Boolean = false;
    
    // Id de los servicios del jefe de servicio / servicio alias ubicacion
    public serviciosAllowed;

    constructor(protected formBuilder: FormBuilder,
                private authService: Auth) {
        super(formBuilder)
    }

    async ngOnInit() {
        this.canProcesarParte = await this.authService.check('partes:parte:procesar_parte');
        this.serviciosAllowed = this.getServiciosAllowed();
        this.initFilterForm(); 
    }

    ngAfterViewInit(){
        // Parche para visualizar correctamente la fecha en el reactive form
        window.setTimeout(() => {
            if (this.filterForm){
                this.filterForm.patchValue({ 
                    fechaDesde: this.filterForm.value.fechaDesde,
                    fechaHasta: this.filterForm.value.fechaHasta,
                 })
            }
        }, 1000);
    }


    initFilterForm(){
        this.filterForm = this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ new Date()],
            agente      : []
        });
    }


    get searchFilterFormParameters(){
        let params:any = {};
        if (this.filterForm.valid){
            let form = this.filterForm.value;
            if (form.fechaDesde){
                params['fecha>'] = form.fechaDesde;
            }
            if (form.fechaHasta){
                params['fecha<'] = form.fechaHasta;
            }
            if (form.agente){
                params['agente._id'] = form.agente._id;
            }
        }
        return params;
    }

     /**
     * Si el usuario tiene otorgado el permiso para procesar partes, entonces
     * esta autorizado a visualizar todas los partes de todos los servicios.
     * Caso contrario solo puede visualizar los partes de su servicio/s. Este
     * metodo debe ser llamado luego de haber determinado si el usuario puede
     * procesar un parte.
     */
    getServiciosAllowed(){
        if (this.serviciosAllowed) return this.serviciosAllowed;
        
        return (!this.canProcesarParte)? this.authService.servicios: [];
    }
    
}
