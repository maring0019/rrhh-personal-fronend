import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-crud-header',
    templateUrl: './header.html',
    
})
export class CrudHeaderComponent {

    @Input() titulo:String;
    @Input() subtitulo:String;
    @Input() action: 'list' | 'create' | 'update';
    @Input() canCreateObject: boolean = false;
    
    @Output() create: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() history: EventEmitter<any> = new EventEmitter<any>();

    public onCreate(){
        this.create.emit();
    }

    public onCancel(){
        this.cancel.emit();
    }

    public onSave(){
        this.save.emit();
    }

    public onHistory(){
        this.history.emit();
    }

}

