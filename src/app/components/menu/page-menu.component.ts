import { Component, OnInit, Input } from "@angular/core";
import { MenuService } from "src/app/services/menu.service";
import { Auth } from "src/app/services/auth.service";

@Component({
    selector: "app-page-menu",
    templateUrl: "page-menu.html",
})
export class PageMenuComponent implements OnInit {
    @Input() title: String = "";
    @Input() menuItem: "principal" | "configuracion" | "partes";
    public denied: Boolean = false;
    public menu = [];

    constructor(private menuService: MenuService, public auth: Auth) {}

    ngOnInit() {
        let menuItems = this.menuService.getMenuItems(this.menuItem);
        for (const item of menuItems) {
            let promises = [];
            for (const perm of item.permiso) {
                promises.push(this.auth.check(perm));
            }

            Promise.all(promises)
                .then((results) => {
                    if (results.includes(true)) {
                        this.menu.push(item);
                    }
                })
                .catch((e) => {
                    // handle errors here
                });
        }
    }
}
