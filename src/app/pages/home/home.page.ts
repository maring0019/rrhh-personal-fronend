import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: 'home.html',
    styleUrls: ['home.scss']
})


export class HomePageComponent implements OnInit {

    public denied: Boolean = false;

    public mpi = true;

    constructor() { }

    ngOnInit() {

    }
}
