import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-block-menu',    
    templateUrl: 'block-menu.html',
    styleUrls: ['block-menu.scss']
})

export class BlockMenuComponent implements OnInit {
    
    
    @Input() style: 'solid' | 'ligth';
    @Input() color: 'color-celeste' | 'color-violeta' = 'color-celeste';
    @Input() icon;
    @Input() size: 'lg' | 'sm'  = 'lg';
    @Input() titulo: String;
    @Input() subtitulo: String;
    @Input() detalle: String;
    @Input() url = '/';

    constructor() { }

    ngOnInit() {

    }
}
