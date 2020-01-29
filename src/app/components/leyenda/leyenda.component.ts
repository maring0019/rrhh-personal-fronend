import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-leyenda',
    template: `
        <section 
            class="d-flex flex-column align-items-center justify-content-center h-75">
            <div class="d-flex flex-column text-center text-muted">
                <span class="mdi mdi-arrow-up-bold-circle-outline mdi-48px"></span>
                <h3><strong>{{ header }}</strong></h3>
                <h5 *ngIf="subHeader">{{ subHeader }}</h5>
            </div>
        </section>`,
  })

export class LeyendaComponent{
    @Input() header: string = 'Ingresar texto de leyenda';
    @Input() subHeader: string;

    constructor() {}

}