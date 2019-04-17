/**
 * TODO: Document THIS
 */

export enum Sexo {
    'femenino',
    'masculino',
    'otro'
}

export enum Genero {
    'femenino',
    'masculino',
    'otro'
}

export enum EstadoCivil {
    casado = 'casado',
    separado = 'separado',
    divorciado = 'divorciado',
    viudo = 'viudo',
    soltero = 'soltero',
    otro = 'otro'
}

export enum TipoComunicacion {
    fijo = 'Teléfono Fijo',
    celular = 'Teléfono Celular',
    email = 'Email'
}


export enum TipoEducacion {
    primario = 'Primario',
    secundario = 'Secundario',
    terciario = 'Terciario',
    universitario = 'Universitario',
    postgrado = 'Postgrado',
}

export function getObjTipoEducacion() {
    let arrTC = Object.keys(TipoComunicacion);
    let salida = arrTC.map(elem => {
        return {
            'id': elem,
            'nombre': titleCase(TipoComunicacion[elem])
        };
    });
    return salida;
}

export function getObjTipos(className) {
    let objKeys = Object.keys(className);
    let salida = objKeys.map(elem => {
        return {
            'id': elem,
            'nombre': className[elem]
        };
    });
    return salida;
}



export enum UnidadEdad {
    'años',
    'meses',
    'días',
    'horas'
}



export function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export function getObjeto(elemento) {
    return {
        'id': elemento,
        'nombre': titleCase(elemento)
    };
}

export function getSexo() {
    let arrSexo = Object.keys(Sexo);
    arrSexo = arrSexo.slice(arrSexo.length / 2);
    return arrSexo;
}

export function getObjSexos() {
    let arrSexo = Object.keys(Sexo);
    arrSexo = arrSexo.slice(arrSexo.length / 2);
    let salida = arrSexo.map(elem => {
        return {
            'id': elem,
            'nombre': titleCase(elem)
        };
    });
    return salida;
}

export function getObjUnidadesEdad() {
    let arrUnidadEdad = Object.keys(UnidadEdad);
    arrUnidadEdad = arrUnidadEdad.slice(arrUnidadEdad.length / 2);
    let salida = arrUnidadEdad.map(elem => {
        return {
            id: elem,
            nombre: titleCase(elem)
        };
    });
    return salida;
}

export function getTipoComunicacion() {
    let arrTC = Object.keys(TipoComunicacion);
    arrTC = arrTC.slice(arrTC.length / 2);
    return arrTC;
}

export function getObjTipoComunicacion() {
    let arrTC = Object.keys(TipoComunicacion);
    // arrTC = arrTC.slice(arrTC.length / 2);
    // let salida = arrTC.map(elem => {
    //     let idEnumerado = elem.split(' ')[1] ? elem.split(' ')[1] : elem.split(' ')[0];
    //     return {
    //         'id': idEnumerado.toLowerCase(),
    //         'nombre': titleCase(elem)
    //     };
    // });

    let salida = arrTC.map(elem => {
        return {
            'id': elem,
            'nombre': titleCase(TipoComunicacion[elem])
        };
    });
    return salida;
}

export function getGenero() {
    let arrGenero = Object.keys(Genero);
    arrGenero = arrGenero.slice(arrGenero.length / 2);
    return arrGenero;
}

export function getObjGeneros() {
    let arrGenero = Object.keys(Genero);
    arrGenero = arrGenero.slice(arrGenero.length / 2);
    let salida = arrGenero.map(elem => {
        return {
            'id': elem,
            'nombre': titleCase(elem)
        };
    });
    return salida;
}

export function getEstadoCivil() {
    let arrEstadoC = Object.keys(EstadoCivil);
    // arrEstadoC = arrEstadoC.slice(arrEstadoC.length); TODO: consultar
    return arrEstadoC;
}

export function getObjEstadoCivil() {
    let arrEstadoC = Object.keys(EstadoCivil);
    // arrEstadoC = arrEstadoC.slice(arrEstadoC.length); TODO: Consultar
    let salida = arrEstadoC.map(elem => {
        return {
            'id': elem,
            'nombre': titleCase(elem)
        };
    });
    return salida;
}

