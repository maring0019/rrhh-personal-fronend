export class Articulo {
    id: String;
    codigo: String;
    nombre: String;
    descripcion: String;
    grupo: Number;                         // TODO Consultar este dato
    limitado: Boolean;                     // TODO consultar este dato
    requiereInformacionAdicional: Boolean; // TODO consultar este dato
    tituloInformacionAdicional: String;
    codigoOTI: String;                     // TODO consultar este dato
    // formulas: [FormulaSchema]           // TODO Definir
}