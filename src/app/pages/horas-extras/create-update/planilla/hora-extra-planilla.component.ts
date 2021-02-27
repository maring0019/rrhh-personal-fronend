import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HoraExtra } from 'src/app/models/HoraExtra';


@Component({
    selector: 'app-hora-extra-planilla',
    templateUrl: './hora-extra-planilla.html'
  })
export class HoraExtraPlanillaComponent implements OnInit {

    @Input() horaExtra: HoraExtra;
    @Input() editable: Boolean = true;

    @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() itemAdded: EventEmitter<any> = new EventEmitter<any>();


    public sortColumn = 'codigo';
    // list-head options
    public columnDef =
    [
        {
            id: 'agente',
            title: 'Agente',
            size: '30'
        },
        {
            id: 'horas_simples',
            title: 'Horas Simples',
            size: '20'
        },
        {
            id: 'horas_semidobles',
            title: 'Horas Semidobles',
            size: '20'
        },
        {
            id: 'horas_dobles',
            title: 'Horas Dobles',
            size: '15'
        },
        {
            id: 'total',
            title: 'Total',
            size: '15'
        },
    ]

    ngOnInit(){}
     

    public addItem(agente, index){
        this.itemAdded.emit({item:agente, index:index})

    }

    public deleteItem(item, index){
        if (this.editable){
            this.deleted.emit(item);
            this.horaExtra.planilla.splice(index, 1); 
        } 
    }

    // TODO
    // Validar entre lineas
    // Procesar
    // Permitir vista edicion. Deshabilitar componentes
    // Imprimir reporte


}