import { Component, Input } from '@angular/core';

@Component({
    selector: 'list-head',
    template: `
        <div class="item-row" *ngIf="columnDef && columnDef.length">
            <div class="item-column">
                <div class="d-flex flex-row justify-content-start align-items-center">
                    <plex-label *ngFor="let col of columnDef; let i=index"
                        [ngClass]="col?.size ? 'wp-' + col?.size : ''"
                        titulo="{{ col.name }}">
                    </plex-label>
                </div>
            </div>
        </div>`
})
export class ListHeadComponent {

    @Input() columnDef:any;

}

