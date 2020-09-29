import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ReportesService } from "src/app/services/reportes.service";

@Component({
    selector: "app-form-filter-legajos",
    templateUrl: "./form-filter-legajos.html",
})
export class FormFilterLegajos {
    @Input() form: FormGroup; // Parent form

    public $opcionesOrdenamiento = this.reportesService.getOpcionesOrdenamiento();

    constructor(private reportesService: ReportesService) {}

    public prepareSearchParams() {
        let params: any = {};
        let form = this.form.value;
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
