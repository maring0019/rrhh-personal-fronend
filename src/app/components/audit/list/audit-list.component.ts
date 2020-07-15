import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';

import { ObjectService } from 'src/app/services/tm/object.service';
import { AuditService } from 'src/app/services/audit.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-audit-list',
    templateUrl: 'audit-list.html',
})
export class AuditListComponent extends ABMListComponent {
    
    public readonly modal_id:string = 'view_history_detail';
    public htmlDiff; // Contenedor para el reporte de diferencias generado en formato html
    public searchingHistory:Boolean = false;
    
    public sortColumn = 'fecha';
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
            size: '20'
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
        private location: Location,
        private modalService: ModalService,
        ) {
            super(router, objectService);
        }
    
    protected get dataService(){
        return this.auditService;
    }

    public cancel(){
        this.location.back();
    }

    public onItemView(item:any){
        if (item){
            this.searchingHistory = true;
            this.auditService.getHtmlDiff(item._id)
            .subscribe(data => {
                this.searchingHistory = false;
                this.htmlDiff = data._body;
                this.onOpenModal();
            }, error => {
                this.searchingHistory = false;
                console.log('History Error:', JSON.stringify(error));
            }); 
        }
    }

    public onOpenModal(){
        this.modalService.open(this.modal_id);
    }

    public onCancelModal(){
        this.modalService.close(this.modal_id);
    }

}