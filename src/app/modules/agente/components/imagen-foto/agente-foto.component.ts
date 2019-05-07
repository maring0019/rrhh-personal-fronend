import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AgenteService } from 'src/app/services/agente.service';

import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-agente-foto',
    templateUrl: './agente-foto.html'
})

export class AgenteFotoComponent implements OnChanges{
    @Input() agente: Agente;
    foto:any;

    _agenteID:any;

    constructor(private sanitizer: DomSanitizer, private agenteService: AgenteService){ }

    ngOnChanges(){
        if (this.agente && this.agente.id){
            if (!this._agenteID || this._agenteID!=this.agente.id){
                this._agenteID = this.agente.id;
                this.displayFoto();
            }
        }
    }

    displayFoto(){
        this.agenteService.getFoto(this.agente.id).subscribe(data => {
            if (data){
                this.foto = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + data);
            }
            else{
                this.foto = null;
            }
            
        });
    }
}