import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dplex-list',
    template: `
    <div [ngClass]="{'striped': striped, 'selectable': selectable, 'full-width': fullWidth}">
        <ng-content></ng-content>
    </div>
    `
})

export class DPlexListComponent implements OnInit {

    @Input() striped = false;
    @Input() selectable = false;
    @Input() fullWidth = false;

    ngOnInit() {
    }

}
