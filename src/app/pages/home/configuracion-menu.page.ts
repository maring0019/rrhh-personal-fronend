import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';


@Component({
    templateUrl: 'configuracion-page.html',
})


export class ConfiguracionMenuPageComponent implements OnInit {

    public denied: Boolean = false;
    public menu;

    constructor(private menuService:MenuService) { }

    ngOnInit() {
        this.menu = this.menuService.getMenuConfiguracion();
    }
}
