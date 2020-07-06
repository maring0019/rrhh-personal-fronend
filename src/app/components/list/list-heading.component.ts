import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-head',
    template: `
        <div class="item-row" *ngIf="columnDef && columnDef.length">
            <div [ngClass]="(botonera)? 'item-column': 'item-column-full'">
                <div class="d-flex flex-row justify-content-start align-items-center">
                    <plex-label *ngFor="let col of columnDef; let i=index"
                        [ngClass]="col?.size ? 'wp-' + col?.size : ''"
                        titulo="{{ col.title }}">
                    </plex-label>
                </div>
            </div>
        </div>`
})
export class ListHeadComponent {

    @Input() columnDef:any;
    @Input() botonera:Boolean = true; // Se utiliza para determinar el ancho total del encabezado

}

