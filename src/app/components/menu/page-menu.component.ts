import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';


@Component({
    selector: 'app-page-menu',    
    templateUrl: 'page-menu.html',
})

export class PageMenuComponent implements OnInit {

    @Input() title: String =  'Menú Configuración General';
    @Input() menuItem: 'principal' | 'configuracion' | 'partes' = 'configuracion'
    public denied: Boolean = false;
    public menu;

    constructor(private menuService:MenuService) { }

    ngOnInit() {
        this.menu = this.menuService.getMenuItems(this.menuItem);
    }
}
