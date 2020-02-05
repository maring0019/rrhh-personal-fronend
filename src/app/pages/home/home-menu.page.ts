import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';


@Component({
    templateUrl: 'home-page.html',
})


export class HomeMenuPageComponent implements OnInit {

    public denied: Boolean = false;
    public menu;

    constructor(private menuService:MenuService) { }

    ngOnInit() {
        this.menu = this.menuService.getMenuPrincipal();
    }
}
