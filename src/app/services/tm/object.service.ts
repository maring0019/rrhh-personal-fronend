import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {
    constructor() { }

    get(service:any, params?: any): Observable<any[]> {
        return service.get(params);
    } 

    // getByID(objectId?: any): Observable<TipoSituacion> {
    //     const url = `${this.url}/${objectId}`;
    //     return this.server.get(url);
    // }

    // post(situacion: TipoSituacion): Observable<TipoSituacion> {
    //     return this.server.post(this.url, situacion);
    // }

    // put(situacion: TipoSituacion): Observable<TipoSituacion> {
    //     return this.server.put(this.url + '/' + situacion._id, situacion);
    // }

    delete(service:any, objectId: any): Observable<any> {
        return service.delete(objectId);
    }

}