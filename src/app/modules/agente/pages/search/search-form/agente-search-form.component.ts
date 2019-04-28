import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AgenteService } from 'src/app/services/agente.service';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-agente-search-form',
    templateUrl: 'agente-search-form.html',
    // styleUrls: ['agente-search-form.scss']
})
export class AgenteSearchFormComponent implements OnInit, OnDestroy {
    private timeoutHandle: number;
    public textoLibre: string = null;
    public autoFocus = 0;

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<Agente[]> = new EventEmitter<Agente[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();


    constructor(private agenteService: AgenteService) {
    }

    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }


    /**
     * Busca agentes cada vez que el campo de busqueda cambia su valor
     */
    public buscar($event) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event.type) {
            return;
        }
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        let textoLibre = this.textoLibre && this.textoLibre.trim();
        // Inicia búsqueda
        if (textoLibre) {
            this.timeoutHandle = window.setTimeout(() => {
                this.searchStart.emit();
                this.timeoutHandle = null;
                this.agenteService.search({
                    cadenaInput: textoLibre
                }).subscribe(
                    resultado => {
                        console.log('resultados');
                        console.log(resultado);
                        this.searchEnd.emit(resultado);
                    },
                    (err) => {
                        this.searchEnd.emit([])
                    }
                );
            }, 1000);
        } else {
            this.searchClear.emit();
        }
    }
}