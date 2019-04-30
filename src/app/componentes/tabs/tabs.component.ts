import { Component, OnInit } from '@angular/core';
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
