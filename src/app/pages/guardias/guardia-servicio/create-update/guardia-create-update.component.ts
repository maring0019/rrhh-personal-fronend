import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Guardia } from 'src/app/models/Guardia';


@Component({
    selector: 'app-guardia-create-update',
    templateUrl: './guardia-create-update.html'
  })
export class GuardiaCreateUpdateComponent implements OnInit {

    public isEditable = true;
    public guardia: Guardia;
    
    private _objectID:any; // To keep track of object on update

    constructor(private route: ActivatedRoute){}

    ngOnInit(){

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
        this.isEditable = false;
        // this.agenteService.getByID(this._agenteID).subscribe((data) => {
        //     if (data){
        //         this.agente = new Agente(data);
        //         this.agenteDetalle = new Agente(data);
        //         this.initValueForms();
        //     }else{
        //         this.plex.info('info', 'El agente que desea editar no existe!')
        //             .then( e => {
        //                 this.volverInicio();
        //         });
        //     }
        // });
    }

    private prepareDataForCreate(){
        let mock = {
            periodo :
                {
                    fechaDesde: new Date('2019-02-16'),
                    fechaHasta: new Date('2019-03-15'),
                }
        }
        this.guardia = new Guardia(mock);
    }

}