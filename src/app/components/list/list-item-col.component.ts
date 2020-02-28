import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'list-column',
    template: `
        <div class="{{ className }}">
            <ng-content>
            </ng-content>
        </div>`
})
export class ListItemColumnComponent implements OnInit {

    @Input() columnDef:any[] = [];
    @Input() position:number = -1;

    public className:String = "";
    
    ngOnInit() {
        if (this.columnDef[this.position] && this.columnDef[this.position].size){
            this.className = 'wp-' + this.columnDef[this.position].size;
        }
    }
}