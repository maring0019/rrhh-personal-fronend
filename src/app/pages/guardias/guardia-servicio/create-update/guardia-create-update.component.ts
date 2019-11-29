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
    
    //TODO: 
    //   OK. Ver como identificar en el html un dia completo o medio dia
    //   Ok. Ver al hacer click de agregar medio dia o dia completo 
    //   OK. Ver de No permitir hacer click en las celdas en donde no hay dias validos
    //   Ok. Ver de contabilizar correctamente la cantidad de dias de guardia
    //   Ver como agregar agentes a la plantilla

    //   Ver como armar la estructura necesaria para el html una vez consultado el servicio
    //   Ver de realizar validaciones segun alguna configuracion a definiar 
    //   Analizar si no es conveniente agregar info sobre el tipo de guardia en cada item de la planilla
    //   Ver de contabilizar las guardias por dia
    //   Ver de agregar un pointer al realizar un hover sobre las celdas
    //   Ver como calcular los dias de un agente en otraaaas planillas para el mismo periodo?
    //   Ver si se puede resaltar una fila al hacer click
    //   Ver si se puede resaltar una columna al hacer hover o click
    //   Ver si es posible agregar info de contexto al pasar el mouse por arriba de una celda

    
    private prepareDataForCreate(){
        let mock = {
            periodo :
                {
                    fechaDesde: new Date('2019-02-16'),
                    fechaHasta: new Date('2019-03-15'),
                },
            planilla : 
                [
                    {
                        agente: { nombre: "Mariana", apellido: "Vazquez", numero: "15345"},
                        diasGuardia: [
                            { 
                                fecha: new Date('2019-02-16'),
                                diaCompleto: false
                            },
                            { 
                                fecha: new Date('2019-02-17'),
                                diaCompleto: true
                            },
                            null, null, null, null, null, null,
                            {
                                fecha: new Date('2019-03-01'),
                                diaCompleto: true
                            } 
                        ]
                    },
                    
                    {
                        agente: { nombre: "Ana Paula", apellido: "Reva", numero: "32455"},
                        diasGuardia: []
                    },
                    {
                        agente: { nombre: "Marcela Adriana", apellido: "Jara", numero: "55343"},
                        diasGuardia: []
                    }
                ]
        }
        this.guardia = new Guardia(mock);
    }

}