import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: 'context-menu.html',
  styleUrls: ['./context-menu.scss']
})
export class ContextMenuComponent{

  constructor() { }


  @Input() x=0;
  @Input() y=0;

}