import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';

import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-agente-foto',
    templateUrl: './agente-foto.html',
    styleUrls: ['./agente-foto.scss']
})

export class AgenteFotoComponent implements OnChanges{
    @Input() foto: any;          // Imagen del agente a mostrar siempre que este disponible. String base64
    @Input() agente: Agente;     // Alternativamente si se provee un agente se intentara recuperar su imagen via API
    @Input() editable: Boolean;  // Indica si el componente admite cambiar la imagen visualizada
    @Input() size: String;       // Tamaño de la imagen.Las opciones son sm|md|lg
    @Output() outputNewFoto: EventEmitter<any> = new EventEmitter<any>();

    imagenDefault = this.sanitize('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20id%3D"Layer_4"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20xmlns%3Axlink%3D"http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink"%20x%3D"0px"%20y%3D"0px"%0D%0A%09%20width%3D"480px"%20height%3D"535px"%20viewBox%3D"0%200%20480%20535"%20enable-background%3D"new%200%200%20480%20535"%20xml%3Aspace%3D"preserve">%0D%0A<g%20id%3D"Layer_3">%0D%0A%09<linearGradient%20id%3D"SVGID_1_"%20gradientUnits%3D"userSpaceOnUse"%20x1%3D"240"%20y1%3D"535"%20x2%3D"240"%20y2%3D"4.882812e-04">%0D%0A%09%09<stop%20%20offset%3D"0"%20style%3D"stop-color%3A%23C5C5C5"%2F>%0D%0A%09%09<stop%20%20offset%3D"1"%20style%3D"stop-color%3A%239A9A9A"%2F>%0D%0A%09<%2FlinearGradient>%0D%0A%09<rect%20fill%3D"url%28%23SVGID_1_%29"%20width%3D"480"%20height%3D"535"%2F>%0D%0A<%2Fg>%0D%0A<g%20id%3D"Layer_2">%0D%0A%09<path%20fill%3D"%23FFFFFF"%20d%3D"M347.5%2C250c0%2C59.375-48.125%2C107.5-107.5%2C107.5c-59.375%2C0-107.5-48.125-107.5-107.5%0D%0A%09%09c0-59.375%2C48.125-107.5%2C107.5-107.5C299.375%2C142.5%2C347.5%2C190.625%2C347.5%2C250z"%2F>%0D%0A%09<path%20fill%3D"%23FFFFFF"%20d%3D"M421.194%2C535C413.917%2C424.125%2C335.575%2C336.834%2C240%2C336.834c-95.576%2C0-173.917%2C87.291-181.194%2C198.166%0D%0A%09%09H421.194z"%2F>%0D%0A<%2Fg>%0D%0A<%2Fsvg>');

    imagen:any = this.imagenDefault; // Atributo que almacena la imagen a renderizar en el template del componente.

    constructor(
        private sanitizer: DomSanitizer,
        private agenteService:AgenteService,
        public plex: Plex){ }

    ngOnChanges(){
        // Evalua que imagen mostrar ante cualquier cambio externo.
        if (this.foto){
            this.imagen = this.sanitize('data:image/jpeg;base64,' + this.cleanFoto(this.foto));
        }
        else{
            if (this.agente){
                this.searchAndDisplayFotoAgente();
            }
            this.imagen = this.imagenDefault;
        }
    }

    searchAndDisplayFotoAgente(){
        if (this.agente.foto) {
            this.imagen = this.agente.foto;
            return;
        }
        
        if (!this.agente.id) {
            this.imagen = this.imagenDefault;
        }
        else {
            this.agenteService.getFoto(this.agente.id).subscribe(data => {
                if (data){
                    this.imagen = this.sanitize('data:image/jpeg;base64,' + this.cleanFoto(data));
                }
                else{
                    this.imagen = this.imagenDefault;
                }
            });
        }
    }

    sanitize(data){
        return this.sanitizer.bypassSecurityTrustResourceUrl(data);
    }

    cleanFoto(foto){
         return foto.toString().replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
    }

    imagenSizeClass(){
        switch (this.size){
            case 'sm': return 'item-img img-sm';
            case 'md': return 'item-img img-md';
            case 'lg': return 'item-img img-lg';
            default: return 'item-img img-sm';
        }

    }

    /**
     * Realiza solo el preview de una imagen recientemente cargada.
     * No es resposable de realizar el upload al servidor. Para esto
     * notifica hacia el exterior la nueva imagen cargada delegando
     * esta tarea.
     * @param files imagen a mostrar, cargada desde el dispositivo
     */
    preview(files) {
        if(this.editable){
            if (files.length === 0) return;

            let mimeType = files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.plex.info('info', 'Sólo se permite cargar imagenes');
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (_event) => {
                this.imagen = reader.result;
                this.outputNewFoto.emit(reader.result);
            }
        }
        return; // La imagen no es editable
    }

    /**
     * No se utiliza en esta funcion. Se deja temporalmente 
     * para futuros requerimientos.
     */
    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
     }
}