import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router, ParamMap } from '@angular/router';
import { AgenteService } from 'src/app/servicios/agente.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Modelo
import { Agente } from '../../modelos/agente';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {

  agentes$: Observable<Agente>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AgenteService,
  ) {}

  ngOnInit() {
    this.agentes$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getAgente(params.get('id')))
      );
  }

  gotoAgentes(agente: Agente) {
    let agenteId = agente ? agente.id : null;
    this.router.navigate(['/inicio/editar' , {id: agenteId}])
  }

  volver() {
    this.router.navigate(['/inicio'])
  }
}