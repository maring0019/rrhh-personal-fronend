import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as formUtils from "src/app/utils/formUtils";

import { ReportesService } from "src/app/services/reportes.service";

@Component({
    selector: "app-form-filter-licencias",
    templateUrl: "./form-filter-licencias.html",
})
export class FormFilterLicencias {
    @Input() form: FormGroup; // Parent form

    // Form select options
    public $opcionesAgrupamiento = this.reportesService.getOpcionesAgrupamiento();
    public $opcionesOrdenamiento = this.reportesService.getOpcionesOrdenamiento();
    // public opcionesVisualizacion = [];

    constructor(private reportesService: ReportesService) {}

    prepareSearchParams() {
        let params: any = {};
        let form = this.form.value;
        if (form.anioDesde && form.anioHasta) {
            params["anios"] = this.parseAnios(
                form.anioDesde,
                form.anioHasta
            ).join();
        }
        // Agrupamiento
        if (form.agrupamiento) {
            params["$group"] = form.agrupamiento.id;
        }
        // Sorting
        if (form.ordenamiento) {
            params["sort"] = form.ordenamiento.id;
        }
        return params;
    }

    public isValid() {
        let _isValid = true;
        const form = this.form.value;
        if (!form.anioDesde) {
            formUtils.markFieldAsInvalid(this.form, "anioDesde");
            _isValid = false;
        }
        if (!form.anioHasta) {
            formUtils.markFieldAsInvalid(this.form, "anioHasta");
            _isValid = false;
        }
        return _isValid;
    }

    private parseAnios(desde, hasta) {
        let anios = [];
        while (desde <= hasta) {
            anios.push(desde);
            desde = desde + 1;
        }
        return anios;
    }
}
