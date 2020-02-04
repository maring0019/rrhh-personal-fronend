import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-leyenda',
    template: `
        <div class="leyenda">
            <section class="leyenda-{{ size }}"
                class="d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex flex-column text-center text-muted">
                    <span class="mdi mdi-arrow-up-bold-circle-outline"></span>
                    <h3><strong>{{ header }}</strong></h3>
                    <h5 *ngIf="subHeader">{{ subHeader }}</h5>
                </div>
            </section>
        </div>`,
        
    styleUrls: ['./leyenda.scss']
  })

export class LeyendaComponent{
    @Input() header: string = 'Ingresar texto de leyenda';
    @Input() subHeader: string;
    @Input() size: 'lg' | 'sm'  = 'lg';

    constructor() {}

}