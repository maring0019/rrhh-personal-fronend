import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ABMListComponent } from "src/app/modules/tm/components/crud/abm-list.component";
import { ObjectService } from "src/app/services/tm/object.service";

import { RolService } from "src/app/services/rol.service";

@Component({
    selector: "app-rol-list",
    templateUrl: "rol-list.html",
})
export class RolListComponent extends ABMListComponent {
    public sortColumn = "rol";
    // list-head options
    public columnDef = [
        {
            id: "rol",
            title: "Rol",
            size: "30",
        },
        {
            id: "descripcion",
            title: "Descripción",
            size: "70",
        }
    ];

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private rolService: RolService
    ) {
        super(router, objectService);
    }

    protected get dataService() {
        return this.rolService;
    }

    public cancel() {
        this.router.navigate(["/seguridad"]);
    }
}
