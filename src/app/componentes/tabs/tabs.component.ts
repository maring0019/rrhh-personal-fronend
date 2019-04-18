import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router, ParamMap } from '@angular/router';
import { AgenteService } from '../../hardcodeo/agente.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Modelo
import { Agente } from '../../hardcodeo/agente';
 
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  agentes$: Observable<Agente>;

  constructor() { }

  ngOnInit() {

  }
}
