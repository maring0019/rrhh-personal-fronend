import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DropdownItem, Plex } from "@andes/plex";

import { ModalService } from "src/app/services/modal.service";
import { Auth } from "src/app/services/auth.service";
import { ReportesService } from "src/app/services/reportes.service";

import { Agente } from "src/app/models/Agente";
import { AgenteService } from "src/app/services/agente.service";

export interface ActionEvent {
    accion: String;
    objeto: Agente;
}

@Component({
    selector: "app-agente-item-listado",
    templateUrl: "./agente-item-listado.html",
    styleUrls: ["./agente-item-listado.scss"],
})
export class AgenteItemListadoComponent {
    public routes = ["Ausencias", "Editar"];

    private _agentes: Agente[];
    public agenteSeleccionado: Agente;
    private idxAgenteSeleccionado: any;

    public accionesDropdownMenu = [];

    layout = "derecha";

    /**
     * Listado de agentes para mostrar. Acepta una lista de agentes
     *
     * @type {(Agente[])}
     */
    @Input()
    get agentes(): Agente[] {
        return this._agentes;
    }

    set agentes(agentes: Agente[]) {
        // Recuperamos los permisos del usuario logueado
        // y actualizamos las acciones extras permitidas
        // que podrá realizar el usuario
        if (agentes && agentes.length) {
            Object.keys(this.perms).forEach((perm) => {
                this.auth.check(perm).then((value) => {
                    this.perms[perm] = value;
                });
            });
        }
        this.accionesDropdownMenu = [];
        // Le damos un poco de tiempo a que se evaluen los permisos
        window.setTimeout(() =>
            agentes.map((agente, index) => {
                let acciones: DropdownItem[] = this.prepareDropdownActions(
                    agente,
                    index
                );
                this.accionesDropdownMenu.push(acciones);
            })
        );
        this._agentes = agentes;
    }

    /**
     * Indica como se muestra la tabla de resultados
     */
    @Input() type: "default" | "sm" = "default";

    /**
     * Indica si es posible realizar acciones extras sobre un agente.
     * Por defecto la lista se comporta unicamente como un componente
     * de seleccion utilizando la propiedad "selected" para notificar
     * este evento.
     * Si "editable" es true se habilitan las siguientes acciones:
     *     - Ver el detalle de un agente
     *     - Ver ausentismo de un agente
     *     - Dar de baja de un agente
     *     - Activar un agente
     */
    @Input() editable: Boolean = false;

    /**
     * Evento que se emite cuando se selecciona un agente
     */
    @Output() selected: EventEmitter<Agente> = new EventEmitter<Agente>();

    /**
     * Evento que se emite cuando el mouse está sobre un agente
     */
    @Output() hover: EventEmitter<Agente> = new EventEmitter<Agente>();

    /**
     * Evento que se emite cuando el mouse está sobre un agente
     */
    @Output()
    accion: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

    /**
     * Evento que se emite cuando cambia el estado del agente (producto
     * de una accion)
     */
    @Output() change: EventEmitter<Agente> = new EventEmitter<Agente>();

    /**
     * Listado de permisos requeridos para cada accion extra.
     * Si el usuario logueado tiene el correspondiente permiso
     * se muestra el item de menu. Los valores se actualizan
     * cuando se instancia este componente.
     */
    public perms = {
        "agentes:agente:baja_agente": false,
        "agentes:historia:add_historialaboral": false,
        "agentes:nota:add_nota": false,
        "agentes:agente:print_credencial": false,
        "agentes:agente:reactivar_agente": false,
        "agentes:agente:view_fichado": false,
    };

    // print
    public printing: Boolean = false;
    public reportName: string = "agentes_credencial";

    constructor(
        private router: Router,
        private modalService: ModalService,
        private reportesService: ReportesService,
        private agenteService: AgenteService,
        public plex: Plex,
        private auth: Auth
    ) {}

    prepareDropdownActions(agente, index): DropdownItem[] {
        let acciones: DropdownItem[] = [];
        if (agente.activo) {
            if (this.perms["agentes:agente:view_fichado"])
                acciones.push(this.statusFichadoDropdownAction(agente, index));

            if (this.perms["agentes:agente:baja_agente"])
                acciones.push(this.bajaDropdownAction(agente, index));

            if (this.perms["agentes:historia:add_historialaboral"])
                acciones.push(
                    this.historiaLaboralDropdownAction(agente, index)
                );

            if (this.perms["agentes:nota:add_nota"])
                acciones.push(this.notaDropdownAction(agente, index));

            if (this.perms["agentes:agente:print_credencial"])
                acciones.push(
                    this.imprimirCredencialDropdownAction(agente, index)
                );
        } else {
            if (this.perms["agentes:agente:reactivar_agente"])
                acciones.push(this.reactivarDropdownAction(agente, index));
        }
        return acciones;
        // [
        // { label: 'Ir a ruta inexistente', icon: 'pencil', route: '/ruta-rota' },
        // { label: 'Item con handler', icon: 'eye     ', handler: (() => { alert('Este es un handler'); }) }
        // ];
    }

    private statusFichadoDropdownAction(agente, index) {
        let accion = {
            label: "Ver habilitación fichado",
            icon: "mdi mdi-eye",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.handleFichadoConsultar(agente);
            },
        };
        return accion;
    }

    private reactivarDropdownAction(agente, index) {
        let accion = {
            label: "Reactivar agente",
            icon: "flag",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.modalService.open("modal-reactivar-agente");
            },
        };
        return accion;
    }

    private bajaDropdownAction(agente, index) {
        let accion = {
            label: "Dar de Baja",
            icon: "flag",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.modalService.open("modal-baja-agente");
            },
        };
        return accion;
    }

    private historiaLaboralDropdownAction(agente, index) {
        let accion = {
            label: "Nueva Historia Laboral",
            icon: "plus",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.modalService.open("modal-historia-laboral-create");
            },
        };
        return accion;
    }

    private notaDropdownAction(agente, index) {
        let accion = {
            label: "Nueva Nota",
            icon: "plus",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.modalService.open("modal-nota-create");
            },
        };
        return accion;
    }

    private imprimirCredencialDropdownAction(agente, index) {
        let accion = {
            label: "Imprimir Credencial",
            icon: "mdi mdi-printer",
            handler: () => {
                this.seleccionarAgente(agente, index);
                this.reportesService
                    .download(this.reportName, { _id: agente._id })
                    .subscribe(
                        (data) => {
                            this.reportesService.descargarArchivo(data);
                            this.printing = false;
                        },
                        (error) => {
                            this.printing = false;
                            console.log(
                                "download error:",
                                JSON.stringify(error)
                            );
                        }
                    );
            },
        };
        return accion;
    }

    public seleccionarAgente(agente: Agente, index?) {
        // if (this.agenteSeleccionado !== agente) {
        //     this.agenteSeleccionado = agente;
        //     this.idxAgenteSeleccionado = index;
        //     this.selected.emit(this.agenteSeleccionado);
        // }

        this.agenteSeleccionado = new Agente(agente);
        this.idxAgenteSeleccionado = index;
        this.selected.emit(this.agenteSeleccionado);
    }

    public hoverAgente(agente: Agente) {
        this.hover.emit(agente);
    }

    public gotoAgente(agente) {
        if (agente._id) {
            this.router.navigate(["/agentes/registro", agente._id]);
        } else {
            this.router.navigate(["/agentes/registro"]);
        }
    }

    public gotoAusenciasAgente(agente) {
        if (agente._id) {
            this.router.navigateByUrl(
                `/agentes/${agente._id}/ausentismo/listado`
            );
        }
    }

    public onSuccessBaja(e) {
        this.modalService.close("modal-baja-agente");
        // Refresh del agente del listado, y acciones disponibles de su menu
        this.agenteSeleccionado.activo = false;
        this.accionesDropdownMenu[this.idxAgenteSeleccionado] = [
            this.reactivarDropdownAction(
                this.agenteSeleccionado,
                this.idxAgenteSeleccionado
            ),
        ];
        // Luego de dar de baja, consultamos si desea inhabilitar el fichaje
        const title =
            "El agente se dió de baja correctamente ¿Desea también inhabilitarlo para fichar?";
        const subtitle = "Operación Exitosa";
        this.handleFichadoInhabilitar(title, subtitle, this.agenteSeleccionado);
        this.change.emit(this.agenteSeleccionado);
    }

    public onErrorBaja(e) {}

    public onCancelModal(modalId: string) {
        this.modalService.close(modalId);
    }

    public onSuccessReactivar(e) {
        this.modalService.close("modal-reactivar-agente");
        // Refresh del agente del listado, y acciones disponibles de su menu
        this.agenteSeleccionado.activo = true;
        this.accionesDropdownMenu[this.idxAgenteSeleccionado] = [
            this.bajaDropdownAction(
                this.agenteSeleccionado,
                this.idxAgenteSeleccionado
            ),
        ];
        // Luego de la reactivacion, consultamos si desea habilitar el fichaje
        const title =
            "El agente se reactivó correctamente ¿Desea habilitarlo para fichar?";
        const subtitle = "Operación Exitosa";
        this.handleFichadoHabilitar(title, subtitle, this.agenteSeleccionado);
        this.change.emit(this.agenteSeleccionado);
    }

    public onErrorReactivar(e) {
        console.log("Fue un error");
        console.log(e);
        // this.modalService.close('modal-baja-agente');
    }

    public onSuccessHistoriaLaboralCreate(agente) {
        this.modalService.close("modal-historia-laboral-create");
        this.plex.info(
            "success",
            "Se actualizó correctamente la Historia Laboral del Agente"
        );
        this.agenteSeleccionado.situacionLaboral = agente.situacionLaboral;
        this.change.emit(this.agenteSeleccionado);
    }

    public onSuccessNotaCreate(agente) {
        this.modalService.close("modal-nota-create");
        this.plex.info("success", "Se ingresó correctamente la Nota creada.");
        this.change.emit(this.agenteSeleccionado);
    }

    private handleFichadoConsultar(agente) {
        this.agenteService.fichadoConsultar(agente).subscribe(
            (result) => {
                if (result && result.status) {
                    const title =
                        "Agente habilitado para fichar ¿Desea inhabilitarlo para fichar?";
                    const subtitle = "Confirmación";
                    this.handleFichadoInhabilitar(title, subtitle, agente);
                } else {
                    const title =
                        "Agente sin habilitación para fichar ¿Desea habilitarlo para fichar?";
                    const subtitle = "Confirmación";
                    this.handleFichadoHabilitar(title, subtitle, agente);
                }
            },
            (err) => {
                this.plex.info(
                    "danger",
                    `No se pudo consultar si el agente esta habilitado para fichar. ${err}`
                );
            }
        );
    }

    private handleFichadoHabilitar(title, subtitle, agente) {
        this.plex
            .confirm(title, subtitle, "Confirmar", "Cancelar")
            .then((confirm) => {
                if (confirm) {
                    this.agenteService.fichadoHabilitar(agente).subscribe(
                        (result) => {
                            this.plex.info(
                                "success",
                                "Agente habilitado correctamente"
                            );
                        },
                        (err) => {
                            this.plex.info(
                                "danger",
                                `No se pudo habilitar al agente. ${err}`
                            );
                        }
                    );
                }
            });
    }

    private handleFichadoInhabilitar(title, subttitle, agente) {
        this.plex
            .confirm(title, subttitle, "Confirmar", "Cancelar")
            .then((confirm) => {
                if (confirm) {
                    this.agenteService.fichadoInhabilitar(agente).subscribe(
                        (result) => {
                            this.plex.info(
                                "success",
                                "Agente inhabilitado correctamente"
                            );
                        },
                        (err) => {
                            this.plex.info(
                                "danger",
                                `No se pudo inhabilitar al agente. ${err}`
                            );
                        }
                    );
                }
            });
    }
}
