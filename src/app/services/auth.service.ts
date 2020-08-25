import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { tap, publishReplay, refCount } from 'rxjs/operators';
import { platform } from 'os';
import { NgxPermissionsService } from 'ngx-permissions';
import { Usuario } from 'src/app/models/Usuario';
const shiroTrie = require('shiro-trie');

enum Estado { inProgress, active, logout };

interface IOrganizacion {
    id: string;
    nombre: string;
}



@Injectable()
export class Auth {
    private shiro = shiroTrie.new();
    public estado: Estado;
    public usuario: Usuario;
    // public organizacion: IOrganizacion;
    public profesional: string; // El profesional aqui es el agente asociado al usuario
    public servicios:any[] = []
    // public orgs = [];
    private roles: string[];
    private permisos: string[];

    private session$: Observable<any>;

    constructor(private server: Server, private permissionsService: NgxPermissionsService) { };

    private initShiro() {
        this.shiro.reset();
        this.shiro.add(this.permisos);
        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions(this.permisos);
    }

    getToken() {
        return window.sessionStorage.getItem('jwt');
    }

    setToken(token: string) {
        window.sessionStorage.setItem('jwt', token);
    }

    login(usuario: string, password: string): Observable<any> {
        return this.server.post('/auth/login', { usuario: usuario, password: password }, { params: null, showError: false }).pipe(
            tap((data) => {
                this.setToken(data.token);
                this.estado = Estado.inProgress;
            })
        );
    }

    logout() {
        this.estado = Estado.logout;
        this.usuario = null;
        // this.organizacion = null;
        this.roles = null;
        this.permisos = null;
        this.session$ = null;
        window.sessionStorage.removeItem('jwt');
    }

    check(string: string): Promise<boolean> {
        return this.permissionsService.hasPermission(string);
        // return this.shiro.check(string);
    }

    getPermissions(string: string): string[] {
        return this.shiro.permissions(string);
    }

    loggedIn() {
        return this.estado === Estado.active;
    }

    inProgress() {
        return this.estado === Estado.inProgress;
    }

    /**
     *
     * @param force Fuerza la busqueda de los datos de session. Default: false
     */
    session(force = false) {
        if (!this.session$ || force) {
            this.session$ = this.server.get('/auth/sesion').pipe(
                tap((payload) => {
                    this.usuario = payload.usuario;
                    this.profesional = payload.profesional;
                    this.permisos = payload.permisos;
                    this.servicios = payload.servicios;
                    // if (payload.usuario.extra){
                    //     this.profesional = payload.usuario.extra.profesional;
                    //     this.permisos = payload.extra.permisos;
                    //     this.servicios = payload.extra.servicios;
                    // }
                    this.estado = Estado.active;
                    this.initShiro();
                }),
                publishReplay(1),
                refCount()
            );
        }
        return this.session$;
    }
}