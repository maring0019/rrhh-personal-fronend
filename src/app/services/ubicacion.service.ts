import { Injectable } from "@angular/core";
import { Server } from "@andes/shared";
import { Observable } from "rxjs/Observable";
import { Ubicacion } from "../models/Ubicacion";

@Injectable()
export class UbicacionService {
    private baseUrl = "/core/organigrama/ubicaciones";

    constructor(private server: Server) {}

    get(params: any): Observable<Ubicacion[]> {
        return this.server.get(this.baseUrl + "/hospital", {
            params: params,
            showError: true,
        });
    }

    getByCodigo(codigo: any): Observable<Ubicacion> {
        let url = `${this.baseUrl}/codigo/${codigo}`;
        return this.server.get(url);
    }

    getByUserID(userID): Observable<Ubicacion[]> {
        return this.server.get(this.baseUrl + "/usuario/" + userID);
    }
}
