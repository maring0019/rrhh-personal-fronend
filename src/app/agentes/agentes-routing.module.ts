import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';
import { HomePage } from '../pages/home/home.page';


const agentesRoutes: Routes = [
  { 
    path: '', component: HomePage,
    children: [
      {
        path: '',
        component: ListadoComponent,
        children: [
          {
            path: ':id',
            component: DetalleComponent,
          },
          {
            path: '',
            component: HomePage,
          }
        ]
      }
    ]
  },
];

@NgModule({
    imports: [
      RouterModule.forChild(agentesRoutes)
    ],
    exports: [RouterModule]
})
export class AgentesRoutingModule { }
