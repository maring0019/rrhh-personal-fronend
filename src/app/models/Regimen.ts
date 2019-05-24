import { RegimenHorario } from './RegimenHorario';

export class Regimen {
    regimenHorario : RegimenHorario;
    prolongacionJornada: String;
    actividadCritica: String;
    tiempoPleno: Boolean;
    dedicacionExclusiva: Boolean;
    guardiasPasivas:Boolean;
    guardiasActivas: Boolean;
    

    constructor(regimen?)
    {
        regimen = regimen || {};
        this.regimenHorario = new RegimenHorario(regimen.regimenHorario);
        this.prolongacionJornada = regimen.prolongacionJornada || '';
        this.actividadCritica = regimen.actividadCritica || '';
        this.tiempoPleno = regimen.tiempoPleno;
        this.dedicacionExclusiva = regimen.dedicacionExclusiva;
        this.guardiasActivas = regimen.guardiasActivas;
        this.guardiasPasivas = regimen.guardiasPasivas;
    }
}