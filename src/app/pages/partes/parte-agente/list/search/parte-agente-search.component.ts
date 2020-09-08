import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ABMSearchComponent } from "src/app/modules/tm/components/crud/abm-search.component";
import { Auth } from "src/app/services/auth.service";

@Component({
    selector: "app-parte-agente-search-form",
    templateUrl: "parte-agente-search.html",
})
export class ParteAgenteSearchFormComponent
    extends ABMSearchComponent
    implements AfterViewInit {
    //Search form options
    public ubicacionOpciones = this.authService.servicios;

    constructor(protected formBuilder: FormBuilder, private authService: Auth) {
        super(formBuilder);
    }

    ngAfterViewInit() {
        // Parche para visualizar correctamente la fecha en el reactive form
        window.setTimeout(() => {
            if (this.filterForm) {
                this.filterForm.patchValue({
                    fecha: this.filterForm.value.fecha,
                });
                this.search();
            }
        }, 1000);
    }

    initFilterForm() {
        this.filterForm = this.formBuilder.group({
            fecha: [new Date()],
            ubicacion: [
                this.ubicacionOpciones.length
                    ? this.ubicacionOpciones[0]
                    : null,
            ],
        });
    }

    get searchFilterFormParameters() {
        let params: any = {};
        if (this.filterForm.valid) {
            let form = this.filterForm.value;
            if (form.fecha) {
                params["fecha"] = form.fecha;
            }
            if (form.ubicacion) {
                // Filtro por ubicacion del parte
                params["ubicacion.codigo"] = form.ubicacion.codigo;
            }
        }
        return params;
    }

    //     /**
    //      * Simula un 'refresh' del listado de agentes del parte. Es de utilidad
    //      * en casos en los que ya se ha generado previamente el listado, y luego
    //      * un agente o mas se hayan dado de alta o incorparado como agentes del
    //      * servicio del parte y por lo tanto no figuren en el listado original.
    //      */
    //     public reloadPartesAgentes(){
    //         if (!this.searchForm.valid) return ;
    //         let form = this.searchForm.value;
    //         this.agenteService.search({
    //             'situacionLaboral.cargo.servicio.ubicacion': form.servicio.ubicacion,
    //             'activo': true
    //         }).subscribe(agentes => {
    //             if (agentes.length){
    //                 let agentesAusentes = agentes.filter( x => !this.partesAgentes.filter( y => y.agente._id === x._id).length);
    //                 let partesAgentes:ParteAgente[] = []
    //                 for (const agente of agentesAusentes) {
    //                     const parteAgente = new ParteAgente({
    //                         parte: { _id: this.parte._id },
    //                         agente: { _id: agente._id, nombre: agente.nombre, apellido: agente.apellido },
    //                         fecha: this.parte.fecha
    //                     });
    //                     partesAgentes.push(parteAgente);
    //                 }
    //                 this.parteAgenteService.postMany(partesAgentes).subscribe();
    //                 this.buscar();
    //             }
    //         })
    //     }
}
