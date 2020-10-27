import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ABMListComponent } from "src/app/modules/tm/components/crud/abm-list.component";
import { ObjectService } from "src/app/services/tm/object.service";

import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: "app-usuario-list",
    templateUrl: "usuario-list.html",
})
export class UsuarioListComponent extends ABMListComponent {
    public sortColumn = "usuario";
    // list-head options
    public columnDef = [
        {
            id: "username",
            title: "Usuario",
            size: "20",
        },
        {
            id: "apellido",
            title: "Apellido",
            size: "20",
        },
        {
            id: "nombre",
            title: "Nombre",
            size: "20",
        },

        {
            id: "auth-method",
            title: "Metodo de Autenticación",
            size: "15",
        },
        {
            id: "last-login",
            title: "Último Login",
            size: "15",
        },
        {
            id: "activo",
            title: "Activo",
            size: "10",
        },
    ];

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private usuarioService: UsuarioService
    ) {
        super(router, objectService);
    }

    protected get dataService() {
        return this.usuarioService;
    }

    public cancel() {
        this.router.navigate(["/seguridad"]);
    }
}
