import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {
    constructor() { }

    get(service:any, params?: any): Observable<any[]> {
        return service.get(params);
    } 

    getByID(service, objectId?: any): Observable<any> {
        return service.getByID(objectId);
    }

    post(service, object: any): Observable<any> {
        return service.post(object);
    }

    put(service, object:any): Observable<any> {
        return service.put(object);
    }

    delete(service:any, objectId: any): Observable<any> {
        return service.delete(objectId);
    }

    history(service, objectId?: any): Observable<any> {
        return service.history(objectId);
    }

}