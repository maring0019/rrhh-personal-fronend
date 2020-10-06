import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "src/app/services/auth.service";

@Component({
    template: ``,
})
export class LogoutComponent implements OnInit {
    constructor(private auth: Auth, private router: Router) {}

    ngOnInit() {
        this.auth.logout();
        this.router.navigate(["login"]).then(() => {
            window.location.reload();
        });
    }
}
