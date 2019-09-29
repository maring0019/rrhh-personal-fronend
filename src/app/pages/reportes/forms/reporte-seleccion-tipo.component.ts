import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
    selector: 'app-reporte-seleccion-tipo',
    templateUrl: './reporte-seleccion-tipo.html',
})
export class ReporteSeleccionTipoComponent implements OnInit {

    public form: FormGroup;

    // Opciones de visualizacion
    public showAnios;
    public showPeriodos;
    public showArticulos;
    public showAgrupamiento;
    
    // Form select options
    public opcionesTiposReportes;
    public opcionesArticulos = [];
    public opcionesAgrupamiento = [];
    public opcionesOrdenamiento = [];
    public opcionesVisualizacion = [];

    constructor(
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
    }

    private initFormSelectOptions(){
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
            // Cargo TODO Terminar de cargar las opciones de ordenamiento
            { id: 'situacionLaboral.cargo.sector.nombre', nombre: 'Lugar de Trabajo' },
            // { id: 9, nombre: 'Servicio' },
            // { id: 10, nombre: 'Departamento' },
            // { id: 10, nombre: 'Norma Legal' },
            // { id: 10, nombre: 'Categoría' },
            // { id: 10, nombre: 'Función' },
        ];

        this.opcionesAgrupamiento = [
            { id: 'estadoCivil', nombre: 'Estado Civil' },
            { id: 'nacionalidad.nombre', nombre: 'nacionalidad' },
            { id: 'sexo', nombre: 'Sexo' },
            // { id: 'sexo', nombre: 'Edad' }, TODO Ver como resolver esta opcion
            // Domicilio
            { id: 'direccion.localidad.nombre', nombre: 'Localidad' },
            { id: 'direccion.localidad.provincia.nombre', nombre: 'Provincia' },
            // Cargo TODO Implementar todas las opciones
            { id: 'situacionLaboral.cargo.sector.nombre', nombre: 'Lugar de Trabajo' },
            // { id: 9, nombre: 'Servicio' },
            // { id: 10, nombre: 'Departamento' },
            // { id: 10, nombre: 'Norma Legal' },
            // { id: 10, nombre: 'Categoría' },
            // { id: 10, nombre: 'Función' },
        ];
        this.articuloService.get({})
            .subscribe(data => {
            this.opcionesArticulos = data;
        });
    }

    initForm()
    {
        return this.formBuilder.group({
            reporte          : [{ id: 'legajos_agentes', nombre: 'Legajos de Agentes' }],
            agrupamiento     : [{ id: 'situacionLaboral.cargo.sector.nombre', nombre: 'Lugar de Trabajo' }],
            ordenamiento     : [{ id: 'numero', nombre: 'Número de Legajo' },],
            fechaDesde       : [],
            fechaHasta       : [],
            anioDesde        : [],
            anioHasta        : [],
            articulos        : [],
            visualizacion    : []
        });
    }

    public onChangeTipoReporte(e){
        // Debemos actualizar las opciones de filtrado en el form
        if (!e.value) return;
        switch(e.value.id){
            case 'legajos_agentes':
                this.showAnios = false;
                this.showPeriodos = false;
                this.showArticulos = false;
                this.showAgrupamiento = false;
                break;
            case 'listado_agentes':
                this.showAnios = false;
                this.showPeriodos = false;
                this.showArticulos = false;
                this.showAgrupamiento = true;
                break;
            case 'ausentismo':
                this.showAnios = false;
                this.showPeriodos = true;
                this.showArticulos = true;
                this.showAgrupamiento = true;
                break;
            case 'ausentismo_totalesxarticulo':
                this.showAnios = false;
                this.showPeriodos = true;
                this.showArticulos = true;
                this.showAgrupamiento = true;
                break;
            case 'licencias_agentes':
                this.showAnios = true;
                this.showPeriodos = false;
                this.showArticulos = false;
                this.showAgrupamiento = true;
                break;  
        }
    }

    prepareSearchParams(){
        let params:any = {}
        let form = this.form.value;
        // Filters
        if (form.reporte){
            switch(form.reporte.id){
                case 'legajos_agentes':
                    params = this.prepareLegajoSearchParams();
                    break;
                case 'listado_agentes':
                    params = this.prepareListadoSearchParams();
                    break;
                case 'ausentismo':
                    params = this.prepareAusentismoSearchParams();
                    break;
                case 'ausentismo_totalesxarticulo':
                    params = this.prepareAusentismoSearchParams();
                    break;
                case 'licencias_agentes':
                    params = this.prepareLicenciasSearchParams();
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

    prepareListadoSearchParams(){
        let params:any = {};
        let form = this.form.value;
        // Agrupamiento
        if (form.agrupamiento){
            params['$group'] = form.agrupamiento.id;
        }
        // Sorting
        if (form.ordenamiento){
            params['sort'] = form.ordenamiento.id;
        }
        return params;
    }

    prepareAusentismoSearchParams(){
        let params:any = {};
        let form = this.form.value;
        if (form.fechaDesde){
            params['fechaDesde'] = this.parseDate(form.fechaDesde);
        }
        if (form.fechaHasta){
            params['fechaHasta'] = this.parseDate(form.fechaHasta);
        }
        if (form.articulos){
            params['articulos'] =  (form.articulos.map(e=>e.id)).join();
        }
        // Agrupamiento
        if (form.agrupamiento){
            params['$group'] = form.agrupamiento.id;
        }
        // Sorting
        if (form.ordenamiento){
            params['sort'] = form.ordenamiento.id;
        }
        return params;
    }

    private prepareLicenciasSearchParams(){
        let params:any = {};
        let form = this.form.value;
        if (form.anioDesde && form.anioHasta){
            params['anios'] = (this.parseAnios(form.anioDesde, form.anioHasta)).join();
        }
        // Agrupamiento
        if (form.agrupamiento){
            params['$group'] = form.agrupamiento.id;
        }
        // Sorting
        if (form.ordenamiento){
            params['sort'] = form.ordenamiento.id;
        }
        return params;
    }

    // TODO Implementar en otro lugar
    private parseDate(date){
        return moment(date).format('YYYY-MM-DD');
    }

    private parseAnios(desde, hasta){
        let anios = [];
        while (desde<=hasta) {
            anios.push(desde);
            desde = desde + 1;
        }
        return anios;
    }

}
