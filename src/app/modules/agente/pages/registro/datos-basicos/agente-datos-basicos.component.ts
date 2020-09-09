import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { PaisService } from "src/app/services/pais.service";

import { IPais } from "src/app/models/IPais";
import { Agente } from "src/app/models/Agente";
import * as enumerados from "src/app/models/enumerados";
import { getCuilCuit } from "src/app/utils/cuilGenerator";
import { PlexTextComponent } from "@andes/plex/src/lib/text/text.component";

@Component({
    selector: "agente-datos-basicos",
    templateUrl: "./agente-datos-basicos.html",
})
export class AgenteDatosBasicosComponent implements OnInit, AfterViewInit {
    @Input() agente: Agente;
    @Input() editable: boolean = false;
    // Notifica cualquier cambio en los datos basicos del formulario del agente (incluida la foto)
    @Output() outputAgente: EventEmitter<Agente> = new EventEmitter<Agente>();

    @ViewChild("apellido") apellidoField: PlexTextComponent; // Para poder setear el focus
    public autoFocus = 0;

    public datosBasicosForm: FormGroup;
    // Form select options
    public sexos = enumerados.getObjSexos();
    public estados = enumerados.getObjEstadoCivil();
    public paises: IPais[] = [];

    public nuevaFotoAgente: any; // Aloja temporalmente una nueva imagen

    constructor(
        private formBuilder: FormBuilder,
        private paisService: PaisService
    ) {}

    ngOnInit() {
        // Init paises
        this.paisService.get({}).subscribe((data) => {
            this.paises = data;
        });

        this.datosBasicosForm = this.createDatosBasicosForm();
        this.datosBasicosForm.valueChanges.subscribe(() => {
            this.outputAgente.emit(this.datosBasicosForm.value);
        });
    }

    ngAfterViewInit() {
        // Patch para poder visualizar correctamente la fecha de nacimiento
        // y colocar el focus en el campo apellido al inicializar
        window.setTimeout(() => {
            this.datosBasicosForm.patchValue({
                fechaNacimiento: this.datosBasicosForm.value.fechaNacimiento,
            });
            this.apellidoField.autoFocus = this.autoFocus + 1;
        }, 1000);
    }

    createDatosBasicosForm() {
        return this.formBuilder.group({
            _id: [this.agente._id],
            numero: [this.agente.numero],
            nombre: [this.agente.nombre],
            apellido: [this.agente.apellido],
            documento: [this.agente.documento],
            cuil: [this.agente.cuil],
            fechaNacimiento: [this.agente.fechaNacimiento],
            sexo: [this.agente.sexo],
            genero: [this.agente.genero],
            estadoCivil: [this.agente.estadoCivil],
            nacionalidad: [this.agente.nacionalidad],
            activo: [this.agente.activo],
        });
    }

    /**
     * Ante un cambio de valor en el sexo o documento del formulario
     * intentamos actualizar el CUIL del agente
     */
    public updateCUIL() {
        let cuil = "";
        let sexo: any = this.datosBasicosForm.value.sexo;
        let documento = this.datosBasicosForm.value.documento;
        if (documento && sexo) {
            if (typeof sexo != "string") {
                sexo = sexo.id;
            }
            try {
                cuil = getCuilCuit("" + documento, sexo);
            } catch {}
        }
        this.datosBasicosForm.patchValue({ cuil: cuil });
    }

    public onValueNewFoto(newFoto) {
        this.nuevaFotoAgente = newFoto;
    }
}
