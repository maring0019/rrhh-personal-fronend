import { Component, OnInit, HostBinding, ViewChild } from "@angular/core";

import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Plex } from "@andes/plex";

import { AgenteService } from "src/app/services/agente.service";
import * as formUtils from "src/app/utils/formUtils";

import { AgenteDatosBasicosComponent } from "./datos-basicos/agente-datos-basicos.component";
import { AgenteDatosDireccionComponent } from "./datos-contacto/agente-datos-direccion.component";
import { AgenteDatosContactoComponent } from "./datos-contacto/agente-datos-contacto.component";
import { AgenteDatosEducacionComponent } from "./datos-educacion/agente-datos-educacion.component";
import { AgenteDatosGeneralesComponent } from "./datos-historia-laboral/datos-generales/agente-datos-generales.component";
import { AgenteDatosSituacionComponent } from "./datos-historia-laboral/datos-situacion/agente-datos-situacion.component";
import { AgenteDatosNormaLegalComponent } from "./datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component";
import { AgenteDatosCargoComponent } from "./datos-historia-laboral/datos-cargo/agente-datos-cargo.component";
import { AgenteDatosRegimenComponent } from "./datos-historia-laboral/datos-regimen/agente-datos-regimen.component";
import { FileManagerComponent } from "src/app/components/file-manager/file.manager.component";
import { HistoriaLaboralListComponent } from "src/app/modules/agente/components/agente-historia-laboral/historia-laboral-list.component";
import { PlexTabsComponent } from "@andes/plex/src/lib/tabs/tabs.component";

import { Contacto } from "src/app/models/Contacto";
import { Agente } from "src/app/models/Agente";
import { Direccion } from "src/app/models/Direccion";
import { Educacion } from "src/app/models/Educacion";
import { NormaLegal } from "src/app/models/NormaLegal";
import { Situacion } from "src/app/models/Situacion";
import { Cargo } from "src/app/models/Cargo";
import { SituacionLaboral } from "src/app/models/SituacionLaboral";
import { Regimen } from "src/app/models/Regimen";
import { Nota } from "src/app/models/Nota";

@Component({
    selector: "app-agente-registro",
    templateUrl: "./agente-registro.html",
    styleUrls: ["./agente-registro.scss"],
})
export class AgenteRegistroComponent implements OnInit {
    @ViewChild(AgenteDatosBasicosComponent)
    datosBasicos: AgenteDatosBasicosComponent;

    @ViewChild(AgenteDatosDireccionComponent)
    datosDireccion: AgenteDatosDireccionComponent;

    @ViewChild(AgenteDatosContactoComponent)
    datosContacto: AgenteDatosContactoComponent;

    @ViewChild(AgenteDatosEducacionComponent)
    datosEducacion: AgenteDatosEducacionComponent;

    @ViewChild(AgenteDatosGeneralesComponent)
    datosSituacionLaboral: AgenteDatosGeneralesComponent;

    @ViewChild(AgenteDatosNormaLegalComponent)
    datosNormaLegal: AgenteDatosNormaLegalComponent;

    @ViewChild(AgenteDatosSituacionComponent)
    datosSituacion: AgenteDatosSituacionComponent;

    @ViewChild(AgenteDatosCargoComponent) datosCargo: AgenteDatosCargoComponent;

    @ViewChild(AgenteDatosRegimenComponent)
    datosRegimen: AgenteDatosRegimenComponent;

    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;

    @ViewChild(HistoriaLaboralListComponent)
    datosHistoriaLaboral: HistoriaLaboralListComponent;

    @ViewChild("tabs") agenteTabs: PlexTabsComponent;

    @HostBinding("class.plex-layout") layout = true;
    // Datos para los formularios
    public agente: Agente;
    public direccion: Direccion;
    public contactos: Contacto[];
    public educacion: Educacion[];
    public situacionLaboral: SituacionLaboral;
    public normaLegal: NormaLegal;
    public situacion: Situacion;
    public cargo: Cargo;
    public regimen: Regimen;
    public notas: Nota[] = [];

    // Variable de control para determinar si se puede puede editar
    // los datos de un agente. En el caso de un alta siempre es true
    public isEditable: boolean = true;

    // Datos a mostrar del agente en el panel lateral. Los cambios en
    // los formularios son aplicados inmediatamente a este objeto
    public agenteDetalle: Agente;

    private _agenteID: any; // To keep track of agente on edit

    // Variable de control para confirmar que el usuario desea editar
    private edicionConfirmada: Boolean = false;

    // Identifica que tabs presentan errores al momento de validar
    public tabsStatus = {
        general: "default",
        domicilio: "default",
        contacto: "default",
        educacion: "default",
        datosLaborales: "default",
        situacion: "default",
        cargo: "default",
        regimenes: "default",
    };
    // Estructura de ayuda para validar los forms dentro de cada tabs.
    // Se utiliza en forma conjunta con la variable definida tabsStatus
    private tabsForms;

    constructor(
        private agenteService: AgenteService,
        private route: ActivatedRoute,
        private router: Router,
        public plex: Plex
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._agenteID = params.get("id");
            if (this._agenteID) {
                this.prepareDataForUpdate();
            } else {
                this.prepareDataForCreate();
            }
        });
    }

    private prepareDataForUpdate() {
        this.isEditable = false;
        this.agenteService.getByID(this._agenteID).subscribe((data) => {
            if (data) {
                this.agente = new Agente(data);
                this.agenteDetalle = data; //new Agente(data); Not required anymore
                this.initValueForms();
            } else {
                this.plex
                    .info("info", "El agente que desea editar no existe!")
                    .then((e) => {
                        this.volverInicio();
                    });
            }
        });
    }

    private prepareDataForCreate() {
        this.agente = new Agente();
        this.agenteDetalle = new Agente();
        this.initValueForms();
    }

    initValueForms() {
        this.direccion = this.agente.direccion;
        this.contactos = this.agente.contactos;
        this.educacion = this.agente.educacion;
        this.situacionLaboral = this.agente.situacionLaboral;
        this.normaLegal = this.agente.situacionLaboral.normaLegal;
        this.situacion = this.agente.situacionLaboral.situacion;
        this.cargo = this.agente.situacionLaboral.cargo;
        this.regimen = this.agente.situacionLaboral.regimen;
        if (this._agenteID)
            this.agenteService
                .getNotas(this._agenteID)
                .subscribe((notas) => (this.notas = notas));
    }

    onValueChangeAgente(obj: Agente) {
        Object.assign(this.agenteDetalle, obj);
        this.validateTab();
    }

    onValueChangeDireccion(obj: Direccion) {
        this.agenteDetalle.direccion = obj;
        this.validateTab();
    }

    onValueChangeContactos(contactos: Contacto[]) {
        this.agenteDetalle.contactos = contactos;
        this.validateTab();
    }

    onValueChangeEducacion(educacion: Educacion[]) {
        this.agenteDetalle.educacion = educacion;
        this.validateTab();
    }

    onValueChangeSituacionLaboral(obj: SituacionLaboral) {
        this.agenteDetalle.situacionLaboral = obj;
        this.validateTab();
    }

    onValueChangeSituacion(obj: Situacion) {
        this.agenteDetalle.situacionLaboral.situacion = obj;
        this.confirmarEdicion();
        this.validateTab();
    }

    onValueChangeNormaLegal(obj: NormaLegal) {
        this.agenteDetalle.situacionLaboral.normaLegal = obj;
        this.confirmarEdicion();
        this.validateTab();
    }

    onValueChangeCargo(obj: Cargo) {
        this.agenteDetalle.situacionLaboral.cargo = obj;
        this.confirmarEdicion();
        this.validateTab();
    }

    onValueChangeRegimen(obj: Regimen) {
        this.agenteDetalle.situacionLaboral.regimen = obj;
        this.confirmarEdicion();
        this.validateTab();
    }

    onValueChangeHistoriaLaboral(e) {
        this.volverInicio();
    }

    /**
     * Valida individualmente los formularios del tab activo y
     * actualiza el status del tab que se esta analizando segun
     * corresponda.
     */
    validateTab() {
        if (this.tabsForms) {
            const idxTab = this.agenteTabs.activeIndex;
            Object.keys(this.tabsForms).forEach((key, index) => {
                if (index == idxTab) {
                    const forms = this.tabsForms[key];
                    let existInvalidForms = false;
                    forms.forEach((f) => {
                        if (f.invalid) {
                            existInvalidForms = true;
                            formUtils.markFormAsInvalid(f);
                        }
                    });
                    this.tabsStatus[key] = existInvalidForms
                        ? "procedimiento"
                        : "default";
                }
            });
        }
    }

    /**
     * Replica la estructura definida en la variable tabsStatus pero con
     * los formularios dentro de cada key.
     * Importante: Mantener siempre la misma estructura que en la variable
     * tabsStatus para que el metodo validateTab() funcione correctamente
     */
    private initTabsForms() {
        this.tabsForms = {
            general: [this.datosBasicos.datosBasicosForm],
            domicilio: [this.datosDireccion.direccionForm],
            contacto: this.datosContacto.contactoForms.controls,
            educacion: this.datosEducacion.educacionForms.controls,
            datosLaborales: [
                this.datosSituacionLaboral.datosGeneralesForm,
                this.datosNormaLegal.datosNormaLegalForm,
            ],
            situacion: [this.datosSituacion.datosSituacionForm],
            cargo: [this.datosCargo.datosCargoForm],
            regimenes: [this.datosRegimen.datosRegimenForm],
        };
    }

    /**
     * Valida todos los formularios presentes. Si encuentra errores
     * ademas actualiza el status del tab con problemas para que sea
     * facilmente identificable para el usuario.
     */
    allFormsValid() {
        if (!this.tabsForms) this.initTabsForms();
        let errors = false;
        Object.keys(this.tabsForms).forEach((key) => {
            const forms = this.tabsForms[key];
            let existInvalidForms = false;
            forms.forEach((f) => {
                if (f.invalid) {
                    existInvalidForms = true;
                    formUtils.markFormAsInvalid(f);
                }
            });
            if (existInvalidForms) {
                errors = true;
                this.tabsStatus[key] = "procedimiento";
            } else {
                this.tabsStatus[key] = "default";
            }
        });
        return !errors;
    }

    /**
     * Guardado de los datos de un agente. Se identifica si
     * se trata de una edicion o alta y delega el guardado
     * final al metodo correspondiente.
     */
    saveAgente() {
        if (this.allFormsValid()) {
            const agente = this.parseAgente();
            if (this._agenteID) {
                this.updateAgente(agente);
            } else {
                this.addAgente(agente);
            }
        } else {
            this.plex.info(
                "danger",
                "Debe completar todos los datos obligatorios"
            );
        }
    }

    parseAgente(): Agente {
        const agente = new Agente(this.datosBasicos.datosBasicosForm.value);
        const direccion = new Direccion(
            this.datosDireccion.direccionForm.value
        );

        // Contactos
        const contactos: Contacto[] = [];
        this.datosContacto.contactoForms.controls.forEach((form) => {
            const contacto = new Contacto(form.value);
            contactos.push(contacto);
        });

        // Educacion
        const estudios: Educacion[] = [];
        this.datosEducacion.educacionForms.controls.forEach((form) => {
            if (
                form.value.educacion &&
                form.value.educacion.tipoEducacion != null
            ) {
                const educacion = new Educacion(form.value.educacion);
                estudios.push(educacion);
            }
        });

        // Situacion Laboral (NormaLegal, Situacion, Cargo, Regimen)
        let situacionLaboral = new SituacionLaboral(
            this.datosSituacionLaboral.datosGeneralesForm.value
        );
        situacionLaboral.normaLegal = new NormaLegal(
            this.datosNormaLegal.datosNormaLegalForm.value
        );
        situacionLaboral.situacion = new Situacion(
            this.datosSituacion.datosSituacionForm.value
        );
        situacionLaboral.cargo = new Cargo(
            this.datosCargo.datosCargoForm.value
        );
        situacionLaboral.regimen = new Regimen(
            this.datosRegimen.datosRegimenForm.value
        );
        agente.situacionLaboral = situacionLaboral;
        agente.direccion = direccion;
        agente.contactos = contactos;
        agente.educacion = estudios;
        return agente;
    }

    addAgente(agente) {
        this.agenteService.post(agente).subscribe((newAgente) => {
            this.saveFoto(newAgente);
            this.saveFiles(newAgente);
            this.plex
                .info("success", "El agente se ingresó correctamente")
                .then((e) => {
                    this.volverInicio();
                });
        });
    }

    updateAgente(agente) {
        this.agenteService.put(agente).subscribe((agenteData) => {
            this.saveFoto(agenteData);
            this.saveFiles(agenteData);
            this.plex
                .info("success", "El agente se modificó correctamente")
                .then((e) => {
                    this.volverInicio();
                });
        });
    }

    private saveFiles(agente) {
        this.fileManager.saveFileChanges(agente);
        this.datosNormaLegal.fileManager.saveFileChanges(
            agente.situacionLaboral.normaLegal
        );
    }

    private saveFoto(agente) {
        if (this.datosBasicos.nuevaFotoAgente) {
            this.agenteService
                .postFoto(agente._id, this.datosBasicos.nuevaFotoAgente)
                .subscribe();
        }
    }

    /**
     *
     */
    private confirmarEdicion() {
        if (this._agenteID && !this.edicionConfirmada) {
            this.plex
                .confirm(
                    "¿Desea continuar con la edición o crear una nueva historia laboral?",
                    "Se están editando datos laborales del agente.",
                    "Continuar Editando",
                    "Crear Nueva Historia"
                )
                .then((confirm) => {
                    this.edicionConfirmada = true;
                    if (!confirm)
                        this.datosHistoriaLaboral.nuevaHistoriaLaboral();
                });
        }
    }

    // Button Actions

    public onEditar() {
        this.isEditable = true;
    }

    public onHistory() {
        this.router.navigate(["/historia/agente", this.agente._id]);
    }

    public onNextTab() {
        const maxTabs = this.agenteTabs.tabs.length;
        const idxTab = this.agenteTabs.activeIndex;
        if (maxTabs - 1 == idxTab) {
            this.agenteTabs.activeIndex = 0;
        } else {
            this.agenteTabs.activeIndex = this.agenteTabs.activeIndex + 1;
        }
    }

    public onPrevTab() {
        const maxTabs = this.agenteTabs.tabs.length;
        const idxTab = this.agenteTabs.activeIndex;
        if (idxTab == 0) {
            this.agenteTabs.activeIndex = maxTabs - 1;
        } else {
            this.agenteTabs.activeIndex = this.agenteTabs.activeIndex - 1;
        }
    }

    volverInicio() {
        this.router.navigate(["/agentes"]);
    }
}
