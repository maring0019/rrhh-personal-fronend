import { Injectable } from "@angular/core";

@Injectable()
export class MenuService {
    getMenuItems(menuKey: string) {
        return this.menuItems[menuKey];
    }

    private menuConfiguracion = [
        {
            titulo: "Feriados",
            subtitulo: "Configuración",
            url: "/configuracion/feriados",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:feriado:view_feriado"],
        },
        {
            titulo: "Artículos",
            subtitulo: "Configuración",
            url: "/configuracion/articulos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:articulo:view_articulo"],
        },
        {
            titulo: "Situación Laboral",
            subtitulo: "Configuracion",
            url: "/configuracion/situaciones",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:agente:view_situacion"],
        },
        {
            titulo: "Regimen Horarios",
            subtitulo: "Configuracion",
            url: "/configuracion/regimen-horarios",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:regimen:view_regimen"],
        },
        {
            titulo: "Licencias Periodos",
            subtitulo: "Configuracion",
            url: "/configuracion/licencia-periodos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:licencia:view_licencia"],
        },
        {
            titulo: "Guardias - Periodos",
            subtitulo: "Configuracion",
            url: "/configuracion/guardia-periodos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:guardia_periodo:view_periodo"],
        },
        {
            titulo: "Guardias - Lotes",
            subtitulo: "Configuracion",
            url: "/configuracion/guardia-lotes",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:guardia_lote:view_lote"],
        },
        {
            titulo: "Recargo - Turnos",
            subtitulo: "Configuracion",
            url: "/configuracion/recargo-turnos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:recargo_turno:view_turno"],
        },
        {
            titulo: "Recargo - Justificaciones",
            subtitulo: "Configuracion",
            url: "/configuracion/recargo-justificaciones",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:recargo_justificacion:view_justificacion"],
        },
        {
            titulo: "Organigrama - Puestos",
            subtitulo: "Configuracion",
            url: "/configuracion/puestos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:puesto:view_puesto"],
        },
        {
            titulo: "Organigrama - SubPuestos",
            subtitulo: "Configuracion",
            url: "/configuracion/subpuestos",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:subpuesto:view_subpuesto"],
        },
        {
            titulo: "General - Paises",
            subtitulo: "Configuracion",
            url: "/configuracion/paises",
            icono: "mdi-account-multiple-outline",
            permiso: ["config:pais:view_pais"],
        },
    ];

    private menuPartes = [
        {
            titulo: "Partes Recibidos",
            subtitulo: "Partes",
            url: "/partes/recibidos",
            icono: "mdi-account-multiple-outline",
            color: "color-violeta",
            permiso: ["partes:parte:procesar_parte"],
        },
        {
            titulo: "Partes Diarios",
            subtitulo: "Partes",
            url: "/partes/agentes",
            icono: "mdi-account-multiple-outline",
            color: "color-violeta",
            permiso: ["partes:parte:add_parte"],
        },
        {
            titulo: "Ingresos y Egresos",
            subtitulo: "Partes",
            url: "/partes/reportes/fichadas",
            icono: "mdi-account-multiple-outline",
            color: "color-violeta",
            permiso: ["partes:reporte:fichadas"],
        },
        {
            titulo: "Partes Diarios por Agente",
            subtitulo: "Partes",
            url: "/partes/reportes/partes",
            icono: "mdi-account-multiple-outline",
            color: "color-violeta",
            permiso: ["partes:reporte:partes"],
        },
    ];

    private menuPrincipal = [
        {
            titulo: "Agentes",
            subtitulo: "",
            detalle: "",
            url: "/agentes",
            icono: "mdi-account-multiple-outline",
            color: "color-celeste",
            style: "solid",
            permiso: ["agentes:agente:view_agente"],
        },
        {
            titulo: "Partes",
            subtitulo: "",
            detalle: "",
            url: "/partes",
            icono: "mdi-clock",
            color: "color-violeta",
            style: "solid",
            permiso: [
                "partes:parte:add_parte",
                "partes:parte:view_parte",
                "partes:parte:procesar_parte",
                "partes:reporte:fichadas",
                "partes:reporte:partes",
            ],
        },
        {
            titulo: "Guardias",
            subtitulo: "",
            detalle: "",
            url: "/guardias",
            icono: "mdi-calendar",
            color: "color-rosa",
            style: "solid",
            permiso: ["guardias:guardia:view_guardia"],
        },
        {
            titulo: "Recargos",
            subtitulo: "",
            detalle: "",
            url: "/recargos",
            icono: "mdi-calendar",
            color: "color-verde-oscuro",
            style: "solid",
            permiso: ["recargos:recargo:view_recargo"],
        },
        {
            titulo: "Horas Extras",
            subtitulo: "",
            detalle: "",
            url: "/horasextras",
            icono: "mdi-calendar",
            color: "color-salmon",
            style: "solid",
            permiso: ["horas_extras:hora_extra:view_hora_extra"],
        },
        {
            titulo: "Reportes",
            subtitulo: "",
            detalle: "",
            url: "/reportes",
            icono: "mdi-file-pdf",
            color: "color-amarillo",
            style: "solid",
            permiso: [
                "reportes:agente:legajo_agentes",
                "reportes:agente:listado_agentes",
                "reportes:ausentismo:ausentismo",
                "reportes:ausentismo:ausentismo_totales",
                "reportes:ausentismo:licencias",
            ],
        },
        {
            titulo: "Configuración",
            subtitulo: "",
            detalle: "",
            url: "/configuracion",
            icono: "mdi-settings",
            color: "color-verde",
            style: "solid",
            permiso: [
                "config:articulo:view_articulo",
                "config:feriado:view_feriado",
                "config:licencia:view_licencia",
                "config:regimen:view_regimen",
            ],
        },
        {
            titulo: "Seguridad",
            subtitulo: "",
            detalle: "",
            url: "/seguridad",
            icono: "mdi-account-multiple-outline",
            color: "andes-naranja-claro",
            style: "solid",
            permiso: [
                "seguridad:usuario:view_usuario",
                "seguridad:rol:view_rol",
            ],
        },
    ];

    private menuSeguridad = [
        {
            titulo: "Usuarios",
            subtitulo: "Seguridad",
            url: "/seguridad/usuarios",
            icono: "mdi-account-multiple-outline",
            color: "andes-naranja-claro",
            permiso: ["seguridad:usuario:view_usuario"],
        },
        {
            titulo: "Roles",
            subtitulo: "Seguridad",
            url: "/seguridad/roles",
            icono: "mdi-account-multiple-outline",
            color: "andes-naranja-claro",
            permiso: ["seguridad:rol:view_rol"],
        }
    ];

    private menuItems = {
        configuracion: this.menuConfiguracion,
        partes: this.menuPartes,
        principal: this.menuPrincipal,
        seguridad: this.menuSeguridad
    };
}
