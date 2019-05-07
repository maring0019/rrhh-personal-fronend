import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Servicios y modelo
//import { Agente } from '../../../models/Agente';
//import { AgenteService } from '../../../services/agente.service';

import { Agente } from '../../../hardcodeo/agente';
import { AgenteMockService } from '../../../hardcodeo/agente.service';

@Component({
  selector: 'app-item-listado',
  templateUrl: './item-listado.component.html',
  styleUrls: ['./item-listado.component.scss']
})

export class ItemListadoComponent implements OnInit {
  agentes$: Observable<Agente[]>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private service: AgenteMockService,
  ) {}

    
  ngOnInit() {

    this.agentes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.service.getAgentes();
      })
    );
  }

}
