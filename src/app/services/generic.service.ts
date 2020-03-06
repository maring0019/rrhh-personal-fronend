import { Observable } from 'rxjs/Observable';
import { Server } from '@andes/shared';

interface IdentityObject {
    _id: String;
}
export abstract class GenericService<T extends IdentityObject> {
    constructor(protected server: Server, protected url:string){}


    factory<T>(type: { new (value:any): T }, value: any): T {
        return new type(value);
    }
    
  
    get(params?: any):Observable<T[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<T> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: T): Observable<T> {
        return this.server.post(this.url, object);
    }

    put(object: T): Observable<T> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

    delete(objectId: any): Observable<T> {
        const url = `${this.url}/${objectId}`;
        return this.server.delete(url);
    }
    
  } 