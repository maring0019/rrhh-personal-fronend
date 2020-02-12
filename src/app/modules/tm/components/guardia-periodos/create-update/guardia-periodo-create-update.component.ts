import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { GuardiaPeriodo } from 'src/app/models/GuardiaPeriodos';



@Component({
    selector: 'app-guardia-periodo-create-update',
    templateUrl: 'guardia-periodo-create-update.html'
  })

export class GuardiaPeriodoCreateUpdateComponent implements OnInit {
    
    private _objectID:any;
    public object:GuardiaPeriodo;
    
    constructor
    (
        private route: ActivatedRoute,
        private location: Location,
        private plex: Plex,
        private objectService: GuardiaPeriodoService

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
                this.object = new GuardiaPeriodo(data);
            } else {
                this.plex.info('info', 'El objeto que desea editar no existe!')
                    .then( e => {
                        this.location.back();
                });
            }
        });
    }

    private prepareDataForCreate(){
        this.object = new GuardiaPeriodo();
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