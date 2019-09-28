import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crud-create-update',
    templateUrl: 'crud-create-update.html',
})
export abstract class CRUDCreateUpdateComponent implements OnInit {

    protected formComponent:any; 

    @ViewChild('form', { read: ViewContainerRef }) formViewContainerRef: ViewContainerRef;

    private formComponentRef:any

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        public location: Location) {
    }

    public ngOnInit() {
        this.createFormComponent();
    }

    private createFormComponent() {
        const factory = this.resolver.resolveComponentFactory(this.formComponent);
        let componentRef:any = this.formViewContainerRef.createComponent(factory);
        // Subscribe to child Output() events
        componentRef.instance.cancel
            .subscribe(event => {
                this.onCancel(event);
            }); 
        componentRef.instance.success
            .subscribe(event => {
                this.onSuccess(event);
            }); 
        componentRef.instance.error
            .subscribe(event => {
                this.onError(event);
            }); 
    }

    public onCancel(e:any){
        this.location.back();
    }

    public onSuccess(obj:any){
        this.location.back();
    }

    public onError(obj:any){
    }

}