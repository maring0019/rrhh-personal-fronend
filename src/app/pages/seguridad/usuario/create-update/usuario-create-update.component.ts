import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Plex } from "@andes/plex";

import { ABMCreateUpdateComponent } from "src/app/modules/tm/components/crud/abm-create-update.component";
import { ObjectService } from "src/app/services/tm/object.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { AgenteService } from "src/app/services/agente.service";

@Component({
    selector: "app-usuario-create-update",
    templateUrl: "usuario-create-update.html",
})
export class UsuarioCreateUpdateComponent extends ABMCreateUpdateComponent {
    titulo = "Usuarios";
    modelName = "usuario";

    public esAgente = true;
    public agente;

    public authMethodOptions = [
        { id: "ldap", nombre: "ldap" },
        { id: "password", nombre: "password" },
    ];

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private usuarioService: UsuarioService,
        private agenteService: AgenteService
    ) {
        super(router, route, location, plex, formBuilder, objectService);
    }

    protected get dataService() {
        return this.usuarioService;
    }

    protected prepareDataForUpdate() {
        this.objectService
            .getByID(this.dataService, this._objectID)
            .subscribe((data) => {
                if (data) {
                    // Ademas del usuario, necesitamos el agente
                    this.agenteService
                        .search({ documento: data.usuario })
                        .subscribe((agentes) => {
                            if (agentes.length == 1) {
                                this.agente = agentes[0];
                                this.object = data;
                            } else {
                                this.object = data;
                            }
                        });
                } else {
                    this.plex
                        .info("info", "El objeto que desea editar no existe!")
                        .then((e) => {
                            this.location.back();
                        });
                }
            });
    }

    protected initForm() {
        // prettier-ignore
        return this.formBuilder.group({
            _id       : [this.object._id],
            esAgente  : [this.object.esAgente],
            agente    : [this.agente],
            usuario   : [this.object.usuario],
            apellido  : [this.object.apellido],
            nombre    : [this.object.nombre],
            authMethod: [this.object.authMethod],
            activo    : [this.object.activo],
        });
    }

    public onSelectAgente(event) {
        this.agente = event.value;
        this.patchFormValues();
    }

    /**
     * Este control esta actualmente oculto. Es decir por ahora
     * todos los usuarios deben ser agentes del sistema.
     */
    public onChangeEsAgente() {
        if (!this.esAgente) {
            this.agente = null;
            this.patchFormValues();
        }
    }

    public onValueNewFoto($event) {}

    private patchFormValues() {
        this.form.patchValue({
            usuario: this.agente ? this.agente.documento : "",
            apellido: this.agente ? this.agente.apellido : "",
            nombre: this.agente ? this.agente.nombre : "",
            agente: this.agente,
        });
    }

    protected add(object) {
        let objToAdd = this.preAdd(object);
        this.objectService.post(this.dataService, objToAdd).subscribe(
            (data) => {
                // formUtils.resetForm(this.form, this._form);
                console.log(data);
                this.onSuccess(data);
            },
            (error) => this.onError(error)
        );
    }

    protected update(object) {
        let objToUpdate = this.preUpdate(object);
        this.objectService.put(this.dataService, objToUpdate).subscribe(
            (data) => {
                // formUtils.resetForm(this.form, this._form);
                this.onSuccess(data);
            },
            (error) => this.onError(error)
        );
    }
}
