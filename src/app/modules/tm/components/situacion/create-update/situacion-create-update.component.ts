// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Location } from '@angular/common';
// import { Plex } from '@andes/plex';


// import { TipoSituacion } from 'src/app/models/TipoSituacion';
// import { TipoSituacionService } from 'src/app/services/tm/situacion.service';



// @Component({
//     selector: 'app-situacion-create-update',
//     templateUrl: 'situacion-create-update.html'
//   })

// export class TipoSituacionCreateUpdateComponent implements OnInit {
    
//     private _objectID:any;
//     public object:TipoSituacion; // changed
    
//     constructor
//     (
//         private route: ActivatedRoute,
//         private location: Location,
//         private plex: Plex,
//         private objectService: TipoSituacionService  // changed

//     ){}

//     public ngOnInit() {
//         this.route.paramMap.subscribe((params: ParamMap) => {
//             this._objectID = params.get('id');
//             if (this._objectID){
//                 this.prepareDataForUpdate();
//             }
//             else{
//                 this.prepareDataForCreate();
//             }
//         });

//     }

//     private prepareDataForUpdate(){
//         this.objectService.getByID(this._objectID).subscribe((data) => {
//             if (data){
//                 this.object = new TipoSituacion(data); // changed
//             } else {
//                 this.plex.info('info', 'El objeto que desea editar no existe!')
//                     .then( e => {
//                         this.location.back();
//                 });
//             }
//         });
//     }

//     private prepareDataForCreate(){
//         this.object = new TipoSituacion(); // changed
//     }

//     public onCancel(e:any){
//         this.location.back();
//     }

//     public onSuccess(obj:any){
//         this.location.back();
//     }

//     public onError(obj:any){
//     }

// }

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';

@Component({
    selector: 'app-situacion-create-update',
    templateUrl: 'situacion-create-update.html'
  })

export class SituacionCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Situacion Laboral';
    
    constructor(
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private tipoSituacionService: TipoSituacionService)
    {
        super(route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.tipoSituacionService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id                 : [ this.object._id ],
            nombre              : [ this.object.nombre ],
            requiereVencimiento : [ this.object.requiereVencimiento ],
            activo              : [ this.object.activo ]
        });
    }
}