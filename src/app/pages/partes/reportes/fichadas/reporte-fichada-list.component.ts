import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { FichadaReporteSearchFormComponent } from './search/fichada-reporte-search.component';
import { FichadaReporteItemListComponent } from './item/fichada-reporte-item-list.component';



@Component({
    selector: 'app-reporte-fichada-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class FichadaReporteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = FichadaReporteSearchFormComponent;
    public itemListComponent = FichadaReporteItemListComponent;
    public titulo = 'Reporte Ingresos y Egresos';
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