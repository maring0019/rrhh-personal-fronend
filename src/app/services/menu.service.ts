import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    getMenuPrincipal(){
        return this.menuPrincipal;
    }

    getMenuConfiguracion(){
        return this.menuConfiguracion;
    }

    private menuConfiguracion = [
        {
            titulo:'Feriados',
            subtitulo:'Configuración',
            url:'/configuracion/feriados',
            icono:'mdi-account-multiple-outline',
        }, 
        {
            titulo: 'Artículos',
            subtitulo:'Configuración',
            url:'/configuracion/articulos',
            icono:'mdi-account-multiple-outline'
        }, 
        { 
            titulo: 'Situación Laboral',
            subtitulo:'Configuracion',
            url:'/configuracion/situaciones',
            icono:'mdi-account-multiple-outline'
        },
        { 
            titulo: 'Periodos Guardia',
            subtitulo:'Configuracion',
            url:'/configuracion/guardia-periodos',
            icono:'mdi-account-multiple-outline'
        },
        { 
            titulo: 'Lotes Guardias',
            subtitulo:'Configuracion',
            url:'/configuracion/guardia-periodos',
            icono:'mdi-account-multiple-outline'
        }]

    private menuPrincipal = [
        {
            titulo:'Agentes',
            subtitulo:'',
            detalle:'',
            url:'/agentes',
            icono:'mdi-account-multiple-outline',
            color:'color-celeste',
            style:'solid'
        }, 
        {
            titulo: 'Partes',
            subtitulo:'',
            detalle:'',
            url:'/partes',
            icono:'mdi-clock',
            color:'color-violeta',
            style:'solid'
        }, 
        { 
            titulo: 'Guardias',
            subtitulo:'',
            detalle:'',
            url:'/guardias',
            icono:'mdi-calendar',
            color:'color-rosa',
            style:'solid'
        },
        { 
            titulo: 'Reportes',
            subtitulo:'',
            detalle:'',
            url:'/reportes',
            icono:'mdi-file-pdf',
            color:'color-amarillo',
            style:'solid'
        },
        { 
            titulo: 'Configuración',
            subtitulo:'',
            detalle:'',
            url:'/configuracion',
            icono:'mdi-settings',
            color:'color-verde',
            style:'solid'
        }
    ]
}