import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AusentismoService } from 'src/app/services/ausentismo.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Articulo } from 'src/app/models/Articulo';
import { CalendarRangeSelectorService } from 'src/app/services/calendar-range-selector.service';
import { getTomorrow } from 'src/app/utils/dates';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';


@Component({
    selector: 'app-ausentismo-form',
    templateUrl: 'ausentismo-form.html'
})
export class AusentismoCargaFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() articulos: Articulo[];

    @Output() changedValue: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() errors: EventEmitter<any> = new EventEmitter<any>();    
    @Output() warnings: EventEmitter<any> = new EventEmitter<any>();
    
    public ausentismoFiles: any = [];

    constructor(
        private ausentismoService: AusentismoService,
        private calendarStoreService: CalendarStoreService,
        private rangeSelectorService: CalendarRangeSelectorService){}

    public ngOnInit() {
        this.updateRangeSelection();
        this.form.valueChanges.subscribe(() => {
            this.changedValue.emit(this.form.value);
        });
    }

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
            error=> this.errors.emit(error));            
        }
    }

    sugerirDatosAusentismo(){
        let ausentismo = new Ausentismo(this.form.value)
        let form:any = this.form.value;
        if (form.enableSugerencias){
            if ( form.articulo && form.fechaDesde){
                this.ausentismoService.postSugerirAusentismo(ausentismo)
                .subscribe(data => {
                    this.form.patchValue({cantidadDias:data.dias});
                    this.form.patchValue({fechaHasta:data.hasta})
                    this.updateRangeSelection();
                    if (data.warnings){
                        this.warnings.emit(data.warnings);            
                    }
                },
                error=> this.errors.emit(error));            
            }
        }
        else{
            this.calcularDatosAusentismo();
        }
    }


    private updateRangeSelection(){
        let fd:Date = this.form.value.fechaDesde;
        let fh:Date = this.form.value.fechaHasta;
        if ((fd && fh) && (fd>fh)) return; // Form validation
        if (!fd && !fh){
            this.rangeSelectorService.setState(null);
            return;
        }
        if (fd && fh) {
            this.rangeSelectorService.setState({fechaDesde:fd, fechaHasta: getTomorrow(fh)});
            return;
        }
        if (fd && !fh) {
            this.rangeSelectorService.setState({fechaDesde:fd, fechaHasta: getTomorrow(fd)});
            return;
        }
        if (!fd && fh) {
            this.rangeSelectorService.setState({fechaDesde:fh, fechaHasta: getTomorrow(fh)});
            return;
        }
    }
}