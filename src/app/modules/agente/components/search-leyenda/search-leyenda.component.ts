import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-search-leyenda',
    template: `
        <section 
            class="d-flex flex-column align-items-center justify-content-center h-75">
            <div class="d-flex flex-column text-center text-muted">
                <span class="mdi mdi-arrow-up-bold-circle-outline mdi-48px"></span>
                <h3><strong>{{ header }}</strong></h3>
                <h5>{{ subHeader }}</h5>
            </div>
        </section>`,
  })

export class SearchLeyendaComponent{
    @Input() header: string = 'Buscá un agente en la barra superior';
    @Input() subHeader: string = 'Podes refinar tu búsqueda a través del botón "Búsqueda avanzada"';

    constructor() {}

}