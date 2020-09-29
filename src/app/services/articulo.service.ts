import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Server } from "@andes/shared";

import { GenericService } from "./generic.service";
import { Articulo } from "../models/Articulo";

@Injectable()
export class ArticuloService extends GenericService<Articulo> {
    constructor(protected server: Server) {
        super(server, "/modules/ausentismo/articulos");
    }

    get(params?: any): Observable<Articulo[]> {
        return this.server.get(this.url, {
            params: params,
            showError: true,
            showLoader: false,
        });
    }
}
