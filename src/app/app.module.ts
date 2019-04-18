import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PlexModule } from '@andes/plex';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { AuthModule } from '@andes/auth';
import { Auth } from '@andes/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Pages
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';

import { RoutingGuard, RoutingNavBar} from './app-guard';

// Componentes
import { ListadoComponent } from './agentes/listado/listado.component';
import { ItemListadoComponent } from './agentes/listado/item-listado/item-listado.component';
import { BuscadorComponent } from './agentes/buscador/buscador.component';
import { DetalleComponent } from './agentes/detalle/detalle.component';
import { TabsComponent } from './agentes/tabs/tabs.component';
import { TabContactoComponent } from './agentes/tabs/tab-contacto/tab-contacto.component';
import { EdicionComponent } from './agentes/edicion/edicion.component';
import { EditPage } from './pages/edit/edit.page';


@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        HomePage,
        EditPage,
        ListadoComponent,
        ItemListadoComponent,
        BuscadorComponent,
        DetalleComponent,
        TabsComponent,
        TabContactoComponent,
        EdicionComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,

        PlexModule,
        AuthModule
    ],
    providers: [
        Plex,
        Server,
        Auth,
        RoutingGuard,
        RoutingNavBar
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
