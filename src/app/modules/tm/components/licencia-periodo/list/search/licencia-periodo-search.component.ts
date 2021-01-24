
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { splitSearchText } from 'src/app/utils/searchUtils';


@Component({
    selector: 'app-licencia-periodo-search',
    templateUrl: 'licencia-periodo-search.html',
})
export class LicenciaPeriodoSearchComponent extends ABMSearchComponent {
    
    public autoFocus = 0;
    public searchText:String;  // User input value

    constructor(protected formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        super(formBuilder)
        // Intentamos recuperar cualquier queryparam existente previo para
        // inicializar el form de busqueda y aplicar los filtros al ingresar
        // al ingresar a la pagina
        const queryParams = this.activatedRoute.snapshot.queryParams;
        this.searchText = queryParams.search || "";
    }

    ngOnInit() {
        this.initFilterForm();
        this.search();
    }
    

    protected prepareSearchParams(){
        let params = {};
        let form = this.filterForm.value;
        let textoLibre = form.searchText? form.searchText.trim(): "";
        if (textoLibre && textoLibre.length >= 3){
            // Los filtros son similares a la busqueda por agente pero no 
            // identicos. Por eso replicamos todo (see getAgenteSearchParams())
            const searchTerms = splitSearchText(textoLibre);

            let andFilters = [];
            for (let exp of searchTerms) {
                const orFilters = {"$or":[
                    {"agente.nombre"   :{"$regex": `${exp}`, "$options":"i"}},
                    {"agente.apellido" :{"$regex": `^${exp}`, "$options":"i"}},
                    {"agente.documento":{"$regex": `^${exp}`, "$options":"i"}},
                    {"agente.numero"   :{"$regex": `^${exp}`, "$options":"i"}},
                ]}
                andFilters.push(orFilters);
            }
            params['filter'] = JSON.stringify({"$and" : andFilters})
        }
        return params
    }

    initFilterForm(){
        this.filterForm = this.formBuilder.group({
            searchText  : this.searchText,
        });
    }

    protected applyFilterToRoute() {
        const form = this.filterForm.value;
		this.router.navigate(
			['/configuracion/licencia-periodos',],
			{
                queryParams: { search: form.searchText },
				relativeTo: this.activatedRoute,
				// NOTE: By using the replaceUrl option, we don't increase the Browser's
				// history depth with every filtering keystroke. 
				replaceUrl: true
			}
		);
    }
}