import { StringifyOptions } from 'querystring';

export class Agente {
    id: number;
    documento: number;
    cuil: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    edad: number;
    sexo: string;
    domicilio: string;
    departamento: string;
    estado: string;
    situacion: string;
    nivel: string;
    titulo: string;
    fechaIngresoEstado: string;
    fechaIngresoHospital: string;
    antiguedad: number;
    tipoNorma: string;
    numeroNorma: number;
    fechaNorma: String;
    agrupamientoNorma: string;
    categoria: string;
    funcion: string;
    lugarTrabajo: string;
    dependencia: string;
    horario: string;
    jornada: string;
    dedicacion: string;
    tiempoPleno: string;
    activas: boolean;
    pasivas: boolean;
    foto: string;
}