import { Component, OnInit, HostBinding } from '@angular/core';
import { ISituacion } from 'src/app/models/ISituacion';
import { SituacionService } from 'src/app/services/tm/situacion.service';

@Component({
  selector: 'app-list-situacion',
  templateUrl: './list-situacion.component.html',
  styleUrls: ['./list-situacion.component.scss']
})
export class ListSituacionComponent implements OnInit {

    @HostBinding('class.plex-layout') layout = true;
    loader = false;
    showcreate = false;
    datos: ISituacion[] = [];
    seleccion: ISituacion;
    
    constructor(
        private situacionService: SituacionService,
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

    onEdit(obj: ISituacion){
        this.showcreate = true;
        this.seleccion = obj;
    }

    changeRequiereVencimiento(obj: ISituacion){
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
     * @param {ISituacion} obj valor retornado al terminar el alta/edicion
     */
    onReturn(obj: ISituacion): void {
        this.showcreate = false;
        this.seleccion = null;
        this.loadDatos();
    }

}
