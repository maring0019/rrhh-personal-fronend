import { Component, OnInit } from '@angular/core';
import { Agente } from '../../modelos/agente';
import { AgenteService } from '../../servicios/agente.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
