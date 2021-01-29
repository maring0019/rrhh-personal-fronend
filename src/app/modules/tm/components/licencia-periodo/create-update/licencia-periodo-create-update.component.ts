import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Plex } from "@andes/plex";

import { ABMCreateUpdateComponent } from "../../crud/abm-create-update.component";
import { ObjectService } from "src/app/services/tm/object.service";
import { IndicadorLicenciaService } from "src/app/services/indicador-licencia.service";
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: "app-licencia-periodo-create-update",
    templateUrl: "licencia-periodo-create-update.html",
})
export class LicenciaPeriodoCreateUpdateComponent extends ABMCreateUpdateComponent {
    titulo = "Licencia Periodos";

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private agenteService: AgenteService,
        private indicadorLicenciaService: IndicadorLicenciaService
    ) {
        super(router, route, location, plex, formBuilder, objectService);
    }

    protected get dataService() {
        return this.indicadorLicenciaService;
    }

    protected initForm() {
        // prettier-ignore
        return this.formBuilder.group({
            _id          : [this.object._id],
            agente       : [this.object.agente],
            vigencia     : [this.object.vigencia],
            totales      : [this.object.totales],
            ejecutadas   : [this.object.ejecutadas]
        });
    }

    protected prepareDataForCreate(){
        const queryParams = this.route.snapshot.queryParams;
        const agenteID = queryParams.agente_id || '';
        if (agenteID) {
            this.agenteService.getByID(agenteID)
                .subscribe(agente => {
                    this.object = {agente: agente};
                } , error => this.object = {})
        } else{
            this.object = {};
        }
    }
}
