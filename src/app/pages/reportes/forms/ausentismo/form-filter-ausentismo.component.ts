import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as formUtils from "src/app/utils/formUtils";

import { ArticuloService } from "src/app/services/articulo.service";
import { ReportesService } from "src/app/services/reportes.service";
import { get_current_year_range, get_current_month_range, parseStrToDate } from 'src/app/utils/dates';

@Component({
    selector: "app-form-filter-ausentismo",
    templateUrl: "./form-filter-ausentismo.html",
})
export class FormFilterAusentismo {
    // public form: FormGroup;
    @Input() form: FormGroup; // Parent form

    // Form select options
    public $opcionesArticulos = this.articuloService.get({});
    public $opcionesAgrupamiento = this.reportesService.getOpcionesAgrupamiento();
    public $opcionesOrdenamiento = this.reportesService.getOpcionesOrdenamiento();
    public periodoSeleccion = [false, false, false]
    public periodos:any = [
        get_current_year_range(),
        get_current_month_range(),
        { fechaDesde: new Date(), fechaHasta: new Date()}
    ]

    
    constructor(
        private articuloService: ArticuloService,
        private reportesService: ReportesService
    ) {}

    prepareSearchParams() {
        let params: any = {};
        let form = this.form.value;
        if (form.fechaDesde) {
            params["fechaDesde"] = parseStrToDate(form.fechaDesde);
        }
        if (form.fechaHasta) {
            params["fechaHasta"] = parseStrToDate(form.fechaHasta);
        }
        if (form.articulos) {
            params["articulos"] = form.articulos.map((e) => e._id).join();
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
        if (!form.fechaDesde) {
            formUtils.markFieldAsInvalid(this.form, "fechaDesde");
            _isValid = false;
        }
        if (!form.fechaHasta) {
            formUtils.markFieldAsInvalid(this.form, "fechaHasta");
            _isValid = false;
        }
        return _isValid;
    }

    public onChangedPeriodoSeleccion(index){
        const newValue = this.periodoSeleccion[index];
        this.periodoSeleccion = [false, false, false];
        this.periodoSeleccion[index] = newValue;
        this.updatePeriodoFormControl(index, newValue)
    }

    public updatePeriodoFormControl(index, seleccion){
        if (!seleccion) {
            this.form.patchValue({ fechaDesde: null });
            this.form.patchValue({ fechaHasta: null });
        }
        else{
            this.form.patchValue({ fechaDesde: this.periodos[index].fechaDesde });
            this.form.patchValue({ fechaHasta: this.periodos[index].fechaHasta });
        }
    }


}
