import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { ParteReporteSearchFormComponent } from './search/parte-reporte-search.component';
import { ParteReporteItemListComponent } from './item/parte-reporte-item-list.component';



@Component({
    selector: 'app-reporte-parte-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class ParteReporteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = ParteReporteSearchFormComponent;
    public itemListComponent = ParteReporteItemListComponent;
    public titulo = 'Reporte Partes Diarios por Agente';
    public canCreateObject: boolean = false;

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public onCerrar(){
        this.router.navigate(['/partes']);
    }

}