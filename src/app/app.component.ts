import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { Auth } from 'src/app/services/auth.service';

// import { Auth } from '@andes/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nada-personal-frontend';

    constructor(public plex: Plex, public server: Server, public auth: Auth) {
        // Configura server. Debería hacerse desde un provider (http://stackoverflow.com/questions/39033835/angularjs2-preload-server-configuration-before-the-application-starts)
        server.setBaseURL(environment.API);

        // Inicializa la vista
        this.plex.updateTitle('ANDES | Apps Neuquinas de Salud');

        // Inicializa el chequeo de conectividad
        // this.initStatusCheck();
    }
}
