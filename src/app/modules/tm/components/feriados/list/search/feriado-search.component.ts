// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder } from '@angular/forms';

// import { FeriadoService } from 'src/app/services/feriado.service';
// import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';


// @Component({
//     selector: 'app-feriado-search-form',
//     templateUrl: 'feriado-search.html',
// })
// export class FeriadoSearchFormComponent extends CRUDSearchFormComponent implements OnInit, OnDestroy {
    
//     constructor(
//         formBuilder: FormBuilder,
//         private objectService: FeriadoService) {
//             super(formBuilder);
//     }

//     ngOnInit() {
//         super.ngOnInit();
//     }

//     ngOnDestroy(){
//         super.ngOnDestroy();
//     }

//     initFormSelectOptions(){
//         return;
//     }

//     initSearchForm(){
//         return this.formBuilder.group({
//             textoLibre  : [],
//             fechaDesde  : [],
//             fechaHasta  : []
//         });
//     }

//     prepareSearchParams(){
//         let params:any = {};
//         let form = this.searchForm.value;
//         // Filters
//         if (form.textoLibre && form.textoLibre.length >= 4){
//             const exp = form.textoLibre;
//             params['filter'] = JSON.stringify({"descripcion":{"$regex": exp, "$options":"i"}}) 
//         }
//         if (form.fechaDesde){
//             params['fecha>'] = form.fechaDesde;
//         }
//         if (form.fechaHasta){
//             params['fecha<'] = form.fechaHasta;
//         }
//         // Sorting
//         params['sort'] = '-fecha';
//         return params;
//     }

//     search(searchParams){
//         this.objectService.get(searchParams).subscribe(
//             objects => {
//                 this.searchEnd.emit(objects);
//             },
//             (err) => {
//                 this.searchEnd.emit([])
//             }
//         );
//     }
// }


import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-feriado-search',
    templateUrl: 'feriado-search.html',
})
export class FeriadoSearchComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }
}