import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';


import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';



@Component({
    selector: 'app-situacion-create-update',
    templateUrl: 'situacion-create-update.html'
  })

export class TipoSituacionCreateUpdateComponent implements OnInit {
    
    private _objectID:any;
    public object:TipoSituacion; // changed
    
    constructor
    (
        private route: ActivatedRoute,
        private location: Location,
        private plex: Plex,
        private objectService: TipoSituacionService  // changed

    ){}

    public ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.prepareDataForUpdate();
            }
            else{
                this.prepareDataForCreate();
            }
        });

    }

    private prepareDataForUpdate(){
        this.objectService.getByID(this._objectID).subscribe((data) => {
            if (data){
                this.object = new TipoSituacion(data); // changed
            } else {
                this.plex.info('info', 'El objeto que desea editar no existe!')
                    .then( e => {
                        this.location.back();
                });
            }
        });
    }

    private prepareDataForCreate(){
        this.object = new TipoSituacion(); // changed
    }

    public onCancel(e:any){
        this.location.back();
    }

    public onSuccess(obj:any){
        this.location.back();
    }

    public onError(obj:any){
    }

}