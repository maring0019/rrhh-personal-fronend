import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reporte-seleccion-tipo',
    templateUrl: './reporte-seleccion-tipo.html',
})
export class ReporteSeleccionTipoComponent implements OnInit {

    public form: FormGroup;
    
    // Form select options
    public opcionesTiposReportes;
    public opcionesAgrupamiento = [];
    public opcionesOrdenamiento = [];
    public opcionesVisualizacion = [];

    constructor(
        private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
    }

    private initFormSelectOptions(){
        // this.sectorService.get({})
        //     .subscribe(data => {
        //         this.sectores = data;
        // });
        // // this.agenteService.get({})
        // //     .subscribe(data => {
        // //         this.agentes = data;
        // // });
        this.opcionesTiposReportes = [
            { id: 'listado_agentes', nombre: 'Listado de Agentes' },
            { id: 'legajos_agentes', nombre: 'Legajos de Agentes' },
            { id: 'ausentismo', nombre: 'Ausentismo' },
            { id: 'ausentismo_totalesxarticulo', nombre: 'Ausentismo - Totales por artículo' },
            { id: 'licencias_agentes', nombre: 'Licencias' }
        ];
        
        this.opcionesOrdenamiento = [
            { id: 'apellido', nombre: 'Apellido y Nombre' },
            { id: 'numero', nombre: 'Número de Legajo' },
            { id: 'documento', nombre: 'Documento' },
            { id: 'estadoCivil', nombre: 'Estado Civil' },
            { id: 'nacionalidad.nombre', nombre: 'Nacionalidad' },
            { id: 'sexo', nombre: 'Sexo' },
            // Domicilio
            { id: 'direccion.localidad.nombre', nombre: 'Localidad' },
            { id: 'direccion.localidad.provincia.nombre', nombre: 'Provincia' },
            // Cargo
            { id: 8, nombre: 'Lugar de Trabajo' },
            { id: 9, nombre: 'Servicio' },
            { id: 10, nombre: 'Departamento' },
            { id: 10, nombre: 'Norma Legal' },
            { id: 10, nombre: 'Categoría' },
            { id: 10, nombre: 'Función' },
        ];
        // this.opcionesAgenteLugarTrabajo = [
        //     { id: 'true', label: 'Agentes con Lugar de Trabajo en:'}];
        // this.opcionesAgente = [
        //     { id: 'true', label: 'Sólo el agente'}];
    }

    initForm()
    {
        return this.formBuilder.group({
            reporte          : [{ id: 'legajos_agentes', nombre: 'Legajos de Agentes' }],
            agrupamiento     : [],
            ordenamiento     : [{ id: 'numero', nombre: 'Número de Legajo' },],
            visualizacion    : []
        });
    }

    prepareSearchParams(){
        let params:any = {}
        let form = this.form.value;
        // Filters
        if (form.reporte){
            console.log(form.reporte)
            switch(form.reporte.id){
                case 'legajos_agentes':
                    params = this.prepareLegajoSearchParams();
                    break;
                case 'listados_agentes':

                    break;
            }
            
        }
        return params;
    }

    prepareLegajoSearchParams(){
        let params:any = {};
        let form = this.form.value;
        // Sorting
        if (form.ordenamiento){
            params['sort'] = form.ordenamiento.id;
        }
        return params;
    }

}
