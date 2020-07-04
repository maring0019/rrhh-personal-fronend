import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { AuditService } from 'src/app/services/audit.service';

@Component({
    selector: 'app-audit-list',
    templateUrl: 'audit-list.html',
})
export class AuditListComponent extends ABMListComponent {

    public sortColumn = 'fecha';
    // list-head options
    public columnDef =
    [
        {
            id: 'fecha',
            title: 'Fecha',
            size: '20'
        },
        {
            id: 'usuario',
            title: 'Usuario',
            size: '30'
        },
        {
            id: 'modificacion',
            title: 'Modificaciones',
            size: '60'
        }
    ]

    
    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private auditService: AuditService,
        private location: Location
        ) {
            super(router, objectService);
        }
    
    protected get dataService(){
        return this.auditService;
    }

    public cancel(){
        this.location.back();
    }

}