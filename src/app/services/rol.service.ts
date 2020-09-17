import { Injectable } from "@angular/core";
import { Server } from "@andes/shared";

import { GenericService } from "./generic.service";
import { Rol } from "src/app/models/Rol";

@Injectable()
export class RolService extends GenericService<Rol> {
    constructor(protected server: Server) {
        super(server, "/modules/seguridad/roles");
    }
}
