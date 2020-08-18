import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-page-menu',    
    templateUrl: 'page-menu.html',
})

export class PageMenuComponent implements OnInit {

    @Input() title: String =  'Menú Configuración General';
    @Input() menuItem: 'principal' | 'configuracion' | 'partes' = 'configuracion'
    public denied: Boolean = false;
    public menu = [];

    constructor(private menuService:MenuService, public auth: Auth) { }

    ngOnInit() {
        let menuItems = this.menuService.getMenuItems(this.menuItem);
        for (const item of menuItems) {    
            this.auth.check(item.permiso).then( result => {
                if (result) this.menu.push(item);
            });
        }
    }
}
