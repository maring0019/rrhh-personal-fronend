import { Injectable } from "@angular/core";
import {
    Http,
    ResponseContentType,
    RequestOptions,
    URLSearchParams,
    Headers,
} from "@angular/http";
// import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";

import { Server } from "@andes/shared";
import { environment } from "src/environments/environment";

export interface Options {
    params?: any;
    showError?: boolean;
    showLoader?: boolean;
}

@Injectable()
export class ReportesService {
    private serverUrl = environment.API;
    private baseUrl = "/modules/reportes"; // URL to web api

    private reportesUrl = {
        // Partes
        partes_agentes: `${this.serverUrl}${this.baseUrl}/agentes/partes`,
        // Ausentismo
        ausentismo_certificado: `${this.serverUrl}${this.baseUrl}/ausentismo/certificado`,
        // Agentes
        agentes_credencial: `${this.serverUrl}${this.baseUrl}/agentes/credencial`,
    };

    constructor(private server: Server, private http: Http) {}

    public download(tipoReporte: string, params?: any): Observable<any> {
        const url = this.reportesUrl[tipoReporte];
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Blob;
        // const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http
            .get(url + "/download", options)
            .map((res) => {
                return {
                    filename: tipoReporte + ".pdf",
                    file: res.blob(),
                };
            })
            .catch(this.handleError);
    }

    public print(params?: any): Observable<any> {
        const url = `${this.serverUrl}${this.baseUrl}/print`;
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Blob;
        // const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http
            .get(url, options)
            .map((res) => {
                return {
                    filename: "reporte.pdf",
                    file: res.blob(),
                };
            })
            .catch(this.handleError);
    }

    public view(params?: any): Observable<any> {
        const url = `${this.serverUrl}${this.baseUrl}/view`;
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Text;
        return this.http.get(url, options).catch(this.handleError);
    }

    public show(tipoReporte: string, params?: any): Observable<any> {
        const url = `${this.serverUrl}${this.baseUrl}/print`; //  this.reportesUrl[tipoReporte];
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Text;
        return this.http.get(url, options).catch(this.handleError);
    }

    public descargarArchivo(data) {
        let url = window.URL.createObjectURL(data.file);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }

    public getOpcionesTipoReportes() {
        let url = `${this.baseUrl}/opciones-tipo-reporte`;
        return this.server.get(url, { showLoader: false });
    }

    public getOpcionesAgrupamiento() {
        let url = `${this.baseUrl}/opciones-agrupamiento`;
        return this.server.get(url, { showLoader: false });
    }

    public getOpcionesOrdenamiento() {
        let url = `${this.baseUrl}/opciones-ordenamiento`;
        return this.server.get(url, { showLoader: false });
    }

    public getOpcionesVisualizacion() {
        let url = `${this.baseUrl}/opciones-visualizacion`;
        return this.server.get(url, { showLoader: false });
    }

    private handleError(error: any) {
        const errorBody = JSON.parse(error._body);
        let errMsg = errorBody.message
            ? errorBody.message
            : error.status
            ? `${error.status} - ${error.statusText}`
            : "Server error";
        return Observable.throw(errMsg);
    }

    private prepareOptions(options: Options): RequestOptions {
        let result = new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: window.sessionStorage.getItem("jwt")
                    ? "JWT " + window.sessionStorage.getItem("jwt")
                    : null,
            }),
        });
        if (options && options.params) {
            result.search = new URLSearchParams();
            for (let param in options.params) {
                if (options.params[param] !== undefined) {
                    if (Array.isArray(options.params[param])) {
                        (options.params[param] as Array<any>).forEach(
                            (value) => {
                                result.search.append(param, value);
                            }
                        );
                    } else {
                        if (options.params[param] instanceof Date) {
                            result.search.set(
                                param,
                                (options.params[param] as Date).toISOString()
                            );
                        } else {
                            result.search.set(param, options.params[param]);
                        }
                    }
                }
            }
        }
        return result;
    }
}
