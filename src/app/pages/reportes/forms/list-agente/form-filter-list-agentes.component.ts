import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ReportesService } from "src/app/services/reportes.service";

@Component({
    selector: "app-form-filter-list-agentes",
    templateUrl: "./form-filter-list-agentes.html",
})
export class FormFilterListAgentes {
    @Input() form: FormGroup; // Parent form

    public $opcionesAgrupamiento = this.reportesService.getOpcionesAgrupamiento();
    public $opcionesOrdenamiento = this.reportesService.getOpcionesOrdenamiento();
    public $opcionesVisualizacion = this.reportesService.getOpcionesVisualizacion();

    constructor(private reportesService: ReportesService) {}

    public prepareSearchParams() {
        let params: any = {};
        let form = this.form.value;
        // Agrupamiento
        if (form.agrupamiento) {
            params["$group"] = form.agrupamiento.id;
        }
        // Opciones de visualizacion
        if (form.visualizacion) {
            params["fields"] = form.visualizacion.map((e) => {
                return e.id;
            });
        }
        // Sorting
        if (form.ordenamiento) {
            params["sort"] = form.ordenamiento.id;
        }
        return params;
    }

    public isValid() {
        return true;
    }
}
