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

    roles$ = this.rolService.get({});

    // Listados para comunicar permisos otorgados o revocados
    // al componente hijo PermisoListComponent
    public permisosGranted: String[];
    public permisosRevoked: String[] = [];
    
    // Listado con todos los roles disponibles. Cada elemento
    // del listado indica ademas si el rol esta 'seleccionado'
    public roles: any = [];
    
    // Variable de control para ocultar/mostrar info
    public verRolesDisponibles: Boolean = false;
    
    // Listado final de permisos seleccionados
    public permisosSelected: String[];

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private usuarioService: UsuarioService,
        private agenteService: AgenteService,
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
            this.roles$,
            (object, roles) => ({ object, roles })
        ).subscribe((result) => {
            this.object = result.object;
            this.permisosGranted = this.object.permisos;
            this.roles = result.roles;
            // Identificacion de roles asignados al usuario
            for (const rol of result.roles) {
                rol.hasPerm = this.object.roles.includes(rol.codename);
            }

            // Ademas del usuario, necesitamos el agente
            if (this.object) {
                    this.agenteService
                        .search({ documento: this.object.usuario })
                        .subscribe((agentes) => {
                            if (agentes.length == 1) this.agente = agentes[0];
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
     * Cuando se selecciona o quita un rol, se deben notificar
     * los permisos que el mismo otorga/revoca.
     * @param event slice (yes or no)
     * @param rol 
     */
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
        if (grantPerms) {
            this.permisosGranted = permisos;
        }
        else {
            this.permisosRevoked = permisos;
        }
    }

    public onPermisosChanged(permisos) {
        this.permisosSelected = permisos;
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
        object.permisos = this.permisosSelected;
        object.roles = this.collectRoles();
        return object;
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
