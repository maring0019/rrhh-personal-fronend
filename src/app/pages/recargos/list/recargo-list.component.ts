import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { RecargoService } from 'src/app/services/recargo.service';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-recargo-list',
    templateUrl: 'recargo-list.html',
})
export class RecargoListComponent extends ABMListComponent {

    public modelName = 'recargo';

    public columnDef =
    [
        {
            id: 'mes',
            title: 'Mes',
            size: '20',
            sort: 'desc'
        },
        {
            id: 'anio',
            title: 'Año',
            size: '20'
        },
        {
            id: 'servicio',
            title: 'Servicio',
            size: '40'
        },
        {
            id: 'estado',
            title: 'Estado',
            size: '20'
        }
    ] 

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private recargoService: RecargoService,
        private authService: Auth,
        public plex: Plex) {
            super(router, objectService);
         }

    public async ngOnInit() {
        this.canCreateObject = await this.authService.check('recargos:recargo:add_recargo');
    }

    protected get dataService(){
        return this.recargoService;
    }

    public cancel(){
        this.router.navigate(['/inicio']);
    }

}