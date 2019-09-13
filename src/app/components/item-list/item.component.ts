import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dplex-item',
    template: `
        <div class="item-list {{ striped ? 'striped' : '' }} d-flex flex-row justify-content-between" [ngClass]="layout">
            <div class="content ">
                <ng-content></ng-content>
                <ng-content select="checkbox"></ng-content>
                <!-- <div *ngIf="badges" class="badges" [ngClass]="{'mr-1': !botonera}"></div> -->
            </div>
            <div class="botonera d-flex flex-row justify-content-end">
                <ng-content select="plex-badge"></ng-content>
                <ng-content select="a"></ng-content>
                <ng-content select="plex-button"></ng-content>
                <ng-content select="plex-dropdown[icon]"></ng-content>
                <ng-content select="upload-file"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./item-list.scss']
})
export class DPlexItemComponent implements OnInit { 

    @Input() layout: 'completo' | 'contenido' | 'izquierda' | 'derecha' = 'completo';
    @Input() headings: any = {};
    @Input() striped = false;
    @Input() botonera = true;
    @Input() badges = true;

    ngOnInit() {
        this.layout = this.layout ? this.layout : 'completo';
    }

}
