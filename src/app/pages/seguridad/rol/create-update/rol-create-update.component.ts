import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Plex } from "@andes/plex";

import { ABMCreateUpdateComponent } from "src/app/modules/tm/components/crud/abm-create-update.component";
import { ObjectService } from "src/app/services/tm/object.service";
import { RolService } from "src/app/services/rol.service";
import { Rol } from 'src/app/models/Rol';


@Component({
    selector: "app-rol-create-update",
    templateUrl: "rol-create-update.html",
})
export class RolCreateUpdateComponent extends ABMCreateUpdateComponent {
    titulo = "Roles";
    modelName = "rol";

    // Listado final de permisos seleccionados
    public permisosSelected: String[];

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private rolService: RolService
    ) {
        super(router, route, location, plex, formBuilder, objectService);
    }

    protected get dataService() {
        return this.rolService;
    }

    protected initForm() {
        // prettier-ignore
        return this.formBuilder.group({
            _id         : [this.object._id],
            nombre      : [this.object.nombre],
            codename    : [this.object.codename],
            descripcion : [this.object.descripcion],
        });
    }

    public onPermisosChanged(permisos) {
        this.permisosSelected = permisos;
    }

    protected preUpdate(object) {
        object = new Rol(object);
        object.permisos = this.permisosSelected;
        return object;
    }

    protected preAdd(object) {
        object = new Rol(object);
        object.permisos = this.permisosSelected;
        return object;
    }

}
