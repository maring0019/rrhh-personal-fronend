import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Server } from "@andes/shared";

@Injectable()
export class PermisoService {
    private url = "/modules/seguridad/permisos"; // URL to web api
    constructor(private server: Server) {}

    get(params?: any): Observable<any[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }
}
