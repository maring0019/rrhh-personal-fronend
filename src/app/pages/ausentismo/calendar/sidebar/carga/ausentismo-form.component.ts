import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AusentismoService } from 'src/app/services/ausentismo.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Articulo } from 'src/app/models/Articulo';
import { CalendarRangeSelectorService } from 'src/app/services/calendar-range-selector.service';

@Component({
    selector: 'app-ausentismo-form',
    templateUrl: 'ausentismo-form.html'
})
export class AusentismoCargaFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() articulos: Articulo[];

    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onErrors: EventEmitter<any> = new EventEmitter<any>();    
    @Output() onWarnings: EventEmitter<any> = new EventEmitter<any>();
    
    public ausentismoFiles: any = [];

    constructor(
        private ausentismoService: AusentismoService,
        private rangeSelectorService: CalendarRangeSelectorService){}

    public ngOnInit() {}

    public onChangedArticulo(articulo){
        if (articulo) this.sugerirDatosAusentismo();
    }


    public onChangedFechaDesde(value){
        if (value) this.sugerirDatosAusentismo();
    }


    public onChangedCantidadDias(dias){
        if (dias){
            this.form.patchValue({fechaHasta:null});
            this.calcularDatosAusentismo();
        } 
    }
    
    public onChangedFechaHasta(value){
        if (value){
            this.form.patchValue({cantidadDias:null});
            this.calcularDatosAusentismo();
        } 
    }

    calcularDatosAusentismo(){
        let ausentismo = new Ausentismo(this.form.value)
        let form:any = this.form.value;
        if ( form.articulo && form.fechaDesde){
            this.ausentismoService.postCalcularAusentismo(ausentismo)
            .subscribe(data => {
                this.form.patchValue({cantidadDias:data.dias});
                this.form.patchValue({fechaHasta:data.hasta})
                this.updateRangeSelection();
            },
            error=> this.onErrors.emit(error));            
        }
    }

    sugerirDatosAusentismo(){
        let ausentismo = new Ausentismo(this.form.value)
        let form:any = this.form.value;
        if ( form.articulo && form.fechaDesde){
            this.ausentismoService.postSugerirAusentismo(ausentismo)
            .subscribe(data => {
                this.form.patchValue({cantidadDias:data.dias});
                this.form.patchValue({fechaHasta:data.hasta})
                this.updateRangeSelection();
                if (data.warnings){
                    this.onWarnings.emit(data.warnings);            
                }
            },
            error=> this.onErrors.emit(error));            
        }
    }


    updateRangeSelection(){
        let fd:Date = this.form.value.fechaDesde;
        let fh:Date = this.form.value.fechaHasta;
        if ((fd && fh) && (fd>fh)) return; // Form validation
        if (!fd && !fh){
            this.rangeSelectorService.setState(null);
            return;
        }
        if (fd && fh) {
            this.rangeSelectorService.setState({fechaDesde:fd, fechaHasta:this.getTomorrow(fh)});
            return;
        }
        if (fd && !fh) {
            this.rangeSelectorService.setState({fechaDesde:fd, fechaHasta:this.getTomorrow(fd)});
            return;
        }
        if (!fd && fh) {
            this.rangeSelectorService.setState({fechaDesde:fh, fechaHasta:this.getTomorrow(fh)});
            return;
        }
    }

    public getTomorrow(date){
        let tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + 1);
        return tomorrow;
    }
}