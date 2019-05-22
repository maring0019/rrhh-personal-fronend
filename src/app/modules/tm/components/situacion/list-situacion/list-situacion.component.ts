import { Component, OnInit, HostBinding } from '@angular/core';
import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';

@Component({
  selector: 'app-list-situacion',
  templateUrl: './list-situacion.component.html',
  styleUrls: ['./list-situacion.component.scss']
})
export class ListTipoSituacionComponent implements OnInit {

    @HostBinding('class.plex-layout') layout = true;
    loader = false;
    showcreate = false;
    datos: TipoSituacion[] = [];
    seleccion: TipoSituacion;
    
    constructor(
        private situacionService: TipoSituacionService,
    ) { }


    ngOnInit() {
        this.loadDatos();
    }

    loadDatos() {
        this.situacionService.get()
            .subscribe( datos => {
                    this.datos = datos;
                    this.loader = false
            });
    }

    onEdit(obj: TipoSituacion){
        this.showcreate = true;
        this.seleccion = obj;
    }

    changeRequiereVencimiento(obj: TipoSituacion){
        // [TODO] Fixme. No se invoca nunca el metodo en el click
        this.situacionService.put(obj)
            .subscribe(dato => this.loadDatos());
    }

    checkAuth(permiso, id) {
        return true;
        // [TODO] Fixme. Ver esquema de permisos
        // return this.auth.check('tm:situacion:' + permiso + (id ? ':' + id : '') );
    }

    
    /**
     * Metodo invocado al terminar el proceso de alta/edicion de una
     * situacion. Oculta el formulario de carga y recarga los datos
     * del listado
     * @param {TipoSituacion} obj valor retornado al terminar el alta/edicion
     */
    onReturn(obj: TipoSituacion): void {
        this.showcreate = false;
        this.seleccion = null;
        this.loadDatos();
    }

}
