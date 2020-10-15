import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import * as enumerados from "src/app/models/enumerados";
import { PaisService } from "src/app/services/pais.service";
import { ProvinciaService } from "src/app/services/provincia.service";
import { LocalidadService } from "src/app/services/localidad.service";
import { TipoSituacionService } from "src/app/services/tm/situacion.service";
import { TipoNormaLegalService } from "src/app/services/tipo-norma-legal.service";
import { PuestoService } from "src/app/services/puesto.service";
import { SubPuestoService } from "src/app/services/subpuesto.service";
import { RegimenHorarioService } from "src/app/services/regimen-horario.service";

@Component({
    selector: "app-reporte-seleccion-filtros",
    templateUrl: "./reporte-seleccion-filtros.html",
})
export class ReporteSeleccionFiltros implements OnInit {
    public form: FormGroup;

    // Form select options
    public sexos = enumerados.getObjSexos();
    public estadosCivil = enumerados.getObjEstadoCivil();
    public $paises = this.paisService.get({});
    public $localidades = this.localidadService.get({});
    public $provincias = this.provinciaService.get({});
    public $tipoSituaciones = this.tipoSituacionService.get({});
    public $tipoNormaLegales = this.tipoNormaLegalService.get({});
    public $puestos = this.puestoService.get({});
    public $subpuestos = this.subpuestoService.get({});
    public $regimenes = this.regimenHorarioService.get({});
    public opcionesSiNo = [
        { id: "si", nombre: "Si" },
        { id: "no", nombre: "No" },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private paisService: PaisService,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        private tipoSituacionService: TipoSituacionService,
        private tipoNormaLegalService: TipoNormaLegalService,
        private puestoService: PuestoService,
        private subpuestoService: SubPuestoService,
        private regimenHorarioService: RegimenHorarioService
    ) {}

    ngOnInit() {
        this.form = this.initForm();
    }

    initForm() {
        // prettier-ignore
        return this.formBuilder.group({
            estadoCivil        : [],
            nacionalidad       : [],
            sexo               : [],
            nacimientoDesde    : [],
            nacimientoHasta    : [],
            edadDesde          : [],
            edadHasta          : [],
            localidad          : [],
            provincia          : [],
            ingresoEstadoDesde : [],
            ingresoEstadoHasta : [],
            situacion          : [],
            tipoNorma          : [],
            puesto             : [], // Alias de Agrupamiento
            subpuesto          : [], // Alias de Funcion
            regimenHorario     : [],
            dedicacionExclusiva: [],
            tiempoPleno        : [],
            guardiasActivas    : [],
            guardiasPasivas    : []
        });
    }

    prepareSearchParams() {
        let params: any = {};
        let form = this.form.value;
        // Filtros Personales
        if (form.estadoCivil) {
            params["estadoCivil"] = form.estadoCivil.id;
        }
        if (form.nacionalidad) {
            params["nacionalidad._id"] = form.nacionalidad._id;
        }
        if (form.sexo) {
            params["sexo"] = form.sexo.id;
        }
        if (form.nacimientoDesde) {
            params["fechaNacimiento>"] = form.nacimientoDesde;
        }
        if (form.nacimientoHasta) {
            params["fechaNacimiento<"] = form.nacimientoHasta;
        }
        // Filtros Domicilio
        if (form.localidad) {
            params["direccion.localidad._id"] = form.localidad._id;
        }
        if (form.provincia) {
            params["direccion.localidad.provincia._id"] = form.provincia._id;
        }
        // Filtros Situacion
        if (form.ingresoEstadoDesde) {
            params["situacionLaboral.fechaIngresoEstado>"] =
                form.ingresoEstadoDesde;
        }
        if (form.ingresoEstadoHasta) {
            params["situacionLaboral.fechaIngresoEstado<"] =
                form.ingresoEstadoHasta;
        }
        if (form.situacion) {
            params["situacionLaboral.situacion.tipoSituacion._id"] =
                form.situacion._id;
        }
        // Filtros Cargos
        if (form.tipoNorma) {
            params["situacionLaboral.normaLegal.tipoNormaLegal._id"] =
                form.tipoNorma._id;
        }
        if (form.puesto) {
            params["situacionLaboral.cargo.puesto._id"] = form.puesto._id;
        }
        if (form.subpuesto) {
            params["situacionLaboral.cargo.subpuesto._id"] = form.subpuesto._id;
        }
        // Filtros Regimenes
        if (form.regimenHorario) {
            params["situacionLaboral.regimen.regimenHorario._id"] =
                form.regimenHorario._id;
        }
        if (form.dedicacionExclusiva) {
            if (form.dedicacionExclusiva.id == "si") {
                params["situacionLaboral.regimen.dedicacionExclusiva"] = true;
            } else {
                params["situacionLaboral.regimen.dedicacionExclusiva!"] = true;
            }
        }
        if (form.tiempoPleno) {
            if (form.tiempoPleno.id == "si") {
                params["situacionLaboral.regimen.tiempoPleno"] = true;
            } else {
                params["situacionLaboral.regimen.tiempoPleno!"] = true;
            }
        }
        if (form.guardiasActivas) {
            if (form.guardiasActivas.id == "si") {
                params["situacionLaboral.regimen.guardiasActivas"] = true;
            } else {
                params["situacionLaboral.regimen.guardiasActivas!"] = true;
            }
        }
        if (form.guardiasPasivas) {
            if (form.guardiasPasivas.id == "si") {
                params["situacionLaboral.regimen.guardiasPasivas"] = true;
            } else {
                params["situacionLaboral.regimen.guardiasPasivas!"] = true;
            }
        }

        return params;
    }
}
