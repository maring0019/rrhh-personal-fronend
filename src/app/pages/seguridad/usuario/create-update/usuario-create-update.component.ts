import { combineLatest } from "rxjs";

import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Plex } from "@andes/plex";

import { ABMCreateUpdateComponent } from "src/app/modules/tm/components/crud/abm-create-update.component";
import { ObjectService } from "src/app/services/tm/object.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { AgenteService } from "src/app/services/agente.service";
import { PermisoService } from "src/app/services/permiso.service";
import { RolService } from "src/app/services/rol.service";

import { Usuario } from "src/app/models/Usuario";

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

    permisos$ = this.permisoService.get({});
    roles$ = this.rolService.get({});

    public permisos: any;
    public roles: any = [];
    public verRolesDisponibles: Boolean = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private usuarioService: UsuarioService,
        private agenteService: AgenteService,
        private permisoService: PermisoService,
        private rolService: RolService
    ) {
        super(router, route, location, plex, formBuilder, objectService);
    }

    protected get dataService() {
        return this.usuarioService;
    }

    protected prepareDataForUpdate() {
        combineLatest(
            this.objectService.getByID(this.dataService, this._objectID),
            this.permisos$,
            this.roles$,
            (object, permisos, roles) => ({ object, permisos, roles })
        ).subscribe((result) => {
            const usuario = result.object;
            // Identificacion de roles asignados al usuario
            for (const rol of result.roles) {
                rol.hasPerm = usuario.roles.includes(rol.codename);
            }

            // Identificacion de permisos asignados al usuario
            for (const perm of result.permisos) {
                let permiso = perm.key;
                if (perm.levels == 1) {
                    for (const child of perm.childs) {
                        permiso = `${perm.key}:${child.key}`;
                        child.hasPerm = usuario.permisos.includes(permiso);
                        child.keyPerm = permiso;
                    }
                } else {
                    for (const child of perm.childs) {
                        for (const innerChild of child.childs) {
                            permiso = `${perm.key}:${child.key}:${innerChild.key}`;
                            innerChild.hasPerm = usuario.permisos.includes(
                                permiso
                            );
                            innerChild.keyPerm = permiso;
                        }
                    }
                }
            }
            this.roles = result.roles;
            this.permisos = result.permisos;
        });

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

    public onChangeRol(event, rol) {
        const grantPerms = event.value; // yes or no
        let permisos = rol.permisos.slice();
        if (!grantPerms) {
            for (const _rol of this.roles) {
                if (_rol._id != rol.id && _rol.hasPerm) {
                    for (let i = permisos.length; i >= 0; i--) {
                        const perm = permisos[i];
                        if (_rol.permisos.includes(perm)) permisos.splice(i, 1);
                    }
                }
            }
        }
        this.updatePermisos(permisos, grantPerms);
    }

    public updatePermisos(controlList, grantPerm) {
        for (const perm of this.permisos) {
            if (perm.levels == 1) {
                for (const child of perm.childs) {
                    if (controlList.includes(child.keyPerm)) {
                        child.hasPerm = grantPerm;
                    }
                }
            } else {
                for (const child of perm.childs) {
                    for (const innerChild of child.childs) {
                        if (controlList.includes(innerChild.keyPerm)) {
                            innerChild.hasPerm = grantPerm;
                        }
                    }
                }
            }
        }
    }

    public hideShow() {
        this.verRolesDisponibles = !this.verRolesDisponibles;
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
                this.onSuccess(data);
            },
            (error) => this.onError(error)
        );
    }

    protected preUpdate(object) {
        object = new Usuario(object);
        object.permisos = this.collectPermisos();
        object.roles = this.collectRoles();
        return object;
    }

    private collectPermisos() {
        let permisos = [];
        for (const perm of this.permisos) {
            if (perm.levels == 1) {
                for (const child of perm.childs) {
                    if (child.hasPerm) permisos.push(child.keyPerm);
                }
            } else {
                for (const child of perm.childs) {
                    for (const innerChild of child.childs) {
                        if (innerChild.hasPerm)
                            permisos.push(innerChild.keyPerm);
                    }
                }
            }
        }
        return permisos;
    }

    private collectRoles() {
        let _roles = [];
        for (const rol of this.roles) {
            if (rol.hasPerm) {
                _roles.push(rol.codename);
            }
        }
        return _roles;
    }
}
