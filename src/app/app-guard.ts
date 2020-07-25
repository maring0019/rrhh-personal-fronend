import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { Plex } from '@andes/plex';
import { Auth } from 'src/app/services/auth.service';


@Injectable()
export class RoutingGuard implements CanActivate {
    constructor(private auth: Auth, private router: Router, private plex: Plex) { }

    canActivate() {
        if (this.auth.loggedIn()) {
            this.plex.updateUserInfo({ usuario: this.auth.usuario });
            return true;
        } else if (this.auth.inProgress() || this.auth.getToken()) {
            return this.auth.session().pipe(map(() => {
                    this.plex.updateUserInfo({ usuario: this.auth.usuario });
            return true;
            }));
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}

@Injectable()
export class RoutingNavBar implements CanActivate {
    constructor(private plex: Plex) { }

    canActivate() {
        this.plex.clearNavbar();
        this.plex.updateTitle('RRHH - Personal');
        return true;
    }
}
