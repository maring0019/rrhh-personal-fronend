import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
    selector: "app-permiso-list",
    templateUrl: "permiso-list.html",
    styleUrls: ["./permiso-list.scss"],
})
export class PermisoListComponent implements OnInit, OnChanges { 

    @Input() permisosGranted;
    @Input() permisosRevoked;

    @Output() permisoGranted: EventEmitter<String> = new EventEmitter<String>();
    @Output() permisoRevoked: EventEmitter<String> = new EventEmitter<String>();
    @Output() permisosChanged: EventEmitter<String[]> = new EventEmitter<String[]>();

    public permisosAll;
    constructor(private permisoService: PermisoService) { }
    
    ngOnInit() {
        this.initPermisos();
    }

    ngOnChanges(changes) {
        if (changes['permisosGranted'] && !changes['permisosGranted'].isFirstChange()){
            this.updatePermisos(changes['permisosGranted'].currentValue, true);
        } 

        if (changes['permisosRevoked'] && !changes['permisosRevoked'].isFirstChange()){
            this.updatePermisos(changes['permisosRevoked'].currentValue, false);
        }        
    }

    private initPermisos() {
        this.permisoService.get({}).subscribe(_permisos => {
            // Append keyPerm to all available perms
            for (const perm of _permisos) {
                if (perm.levels == 1) {
                    for (const child of perm.childs) {
                        child.keyPerm = `${perm.key}:${child.key}`;
                    }
                } else {
                    for (const child of perm.childs) {
                        for (const innerChild of child.childs) {
                            innerChild.keyPerm = `${perm.key}:${child.key}:${innerChild.key}`;
                        }
                    }
                }
            }
            this.permisosAll = _permisos;
            this.updatePermisos(this.permisosGranted, true);
        });   
    }

    public updatePermisos(controlList, grantPerm) {
        controlList = controlList? controlList : [];
        for (const perm of this.permisosAll) {
            if (perm.levels == 1) {
                for (const child of perm.childs) {
                    if (controlList.includes(child.keyPerm)) {
                        child.hasPerm = grantPerm;
                    }
                }
            } else {
                for (const child of perm.childs) {
                    for (const innerChild of child.childs) {
                        if (controlList.includes(innerChild.keyPerm)) {
                            innerChild.hasPerm = grantPerm;
                        }
                    }
                }
            }
        }
        this.notifyPermisosChanges();
    }

    public collectPermisos() {
        let permisos = [];
        for (const perm of this.permisosAll) {
            if (perm.levels == 1) {
                for (const child of perm.childs) {
                    if (child.hasPerm) permisos.push(child.keyPerm);
                }
            } else {
                for (const child of perm.childs) {
                    for (const innerChild of child.childs) {
                        if (innerChild.hasPerm)
                            permisos.push(innerChild.keyPerm);
                    }
                }
            }
        }
        return permisos;
    }

    public onChangePermiso(event, permiso) {
        (event.value)
            ? this.permisoGranted.emit(permiso.keyPerm)
            : this.permisoRevoked.emit(permiso.keyPerm);
        this.notifyPermisosChanges();
        
    }


    private notifyPermisosChanges() {
        this.permisosChanged.emit(this.collectPermisos());
    }

}