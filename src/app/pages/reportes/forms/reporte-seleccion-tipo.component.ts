import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { FormFilterAusentismo } from "src/app/pages/reportes/forms/ausentismo/form-filter-ausentismo.component";
import { FormFilterListAgentes } from "src/app/pages/reportes/forms/list-agente/form-filter-list-agentes.component";
import { FormFilterLegajos } from "src/app/pages/reportes/forms/legajo/form-filter-legajos.component";
import { FormFilterLicencias } from "src/app/pages/reportes/forms/licencias/form-filter-licencias.component";

@Component({
    selector: "app-reporte-seleccion-tipo",
    templateUrl: "./reporte-seleccion-tipo.html",
})
export class ReporteSeleccionTipoComponent implements OnInit {
    @ViewChild(FormFilterAusentismo) formAusentismo: FormFilterAusentismo;
    @ViewChild(FormFilterListAgentes) formListAgentes: FormFilterListAgentes;
    @ViewChild(FormFilterLegajos) formLegajo: FormFilterLegajos;
    @ViewChild(FormFilterLicencias) formLicencias: FormFilterLicencias;

    public form: FormGroup;

    // Identifica los filtros a buscar de acuerdo al reporte seleccionado
    public showFilterForm: String = "legajos_agentes";

    // Parent form select options
    public opcionesTiposReportes;
    public opcionesVisualizacion = [];

    public filterFormsNames = {
        legajos_agentes: "formLegajo",
        listado_agentes: "formListAgentes",
        ausentismo: "formAusentismo",
        ausentismo_totalesxarticulo: "formAusentismo",
        licencias_agentes: "formLicencias",
    };

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
    }

    private initFormSelectOptions() {
        // prettier-ignore
        this.opcionesTiposReportes = [
            { id: "listado_agentes", nombre: "Listado de Agentes" },
            { id: "legajos_agentes", nombre: "Legajos de Agentes" },
            { id: "ausentismo", nombre: "Ausentismo" },
            { id: "ausentismo_totalesxarticulo", nombre: "Ausentismo - Totales por artículo" },
            { id: "licencias_agentes", nombre: "Licencias" },
        ];
    }

    private getFilterForm(formName) {
        let key = this.filterFormsNames[formName];
        return this[key];
    }

    initForm() {
        // prettier-ignore
        return this.formBuilder.group({
            reporte      : [{ id: "legajos_agentes", nombre: "Legajos de Agentes" }],
            agrupamiento : [{ id: "situacionLaboral.cargo.sector.nombre", nombre: "Lugar de Trabajo" }],
            ordenamiento : [{ id: "numero", nombre: "Número de Legajo" }],
            fechaDesde   : [],
            fechaHasta   : [],
            anioDesde    : [],
            anioHasta    : [],
            articulos    : [],
            visualizacion: [],
        });
    }

    public onChangeTipoReporte(e) {
        // Actualizamos la variable de control que determina que
        // filtros mostrar de acuerdo al reporte selecccionado
        if (!e.value) return;
        this.showFilterForm = e.value.id;
    }

    public prepareSearchParams() {
        let params: any = {};
        const form = this.form.value;
        if (form.reporte) {
            params = this.getFilterForm(form.reporte.id).prepareSearchParams();
        }
        return params;
    }

    public allFormsValid() {
        const form = this.form.value;
        if (form.reporte) {
            return this.getFilterForm(form.reporte.id).isValid();
        }
        return true;
    }
}
