

/**
 * Prepare agente common search params based on inputString provided
 * by user, and then merge them with previous params
 * @param params previous params
 * @param inputString 
 */
export function getAgenteSearchParams(params, inputString){
    if (inputString && inputString.length >= 3){
        const exps = splitSearchText(inputString);        
        let andFilters = [];
        for (let exp of exps) {
            const orFilters = {"$or":[
                {"nombre"   :{"$regex": `${exp}`, "$options":"i"}},
                {"apellido" :{"$regex": `^${exp}`, "$options":"i"}},
                {"documento":{"$regex": `^${exp}`, "$options":"i"}},
                {"numero"   :{"$regex": `^${exp}`, "$options":"i"}},
            ]}
            andFilters.push(orFilters);
        }
        params['filter'] = JSON.stringify({"$and" : andFilters});
    }
    return params;
}

export function splitSearchText(inputString){
    // Primero identificamos cadenas especiales separadas por comillas
    // simples o dobles
    const specialChars = ["'", '"'];  
    let exps = []
    for (const specialChar of specialChars) {
        let newString = "";
        while (newString != inputString){
            newString = inputString;
            let substringIndexes = searchIndices(inputString, specialChar);
            if (substringIndexes.length == 2){
                exps.push(extractSpecialString(inputString, substringIndexes));
                inputString = buildNewString(inputString, substringIndexes);
            }
        }    
    }
    
    // Luego identificamos cadenas separadas por espacios simples
    const extraSearchStrings = inputString.trim().split(" ");
    exps = exps.concat(extraSearchStrings.filter(i=>i!=""));
    return exps;
}


function searchIndices(cadena, specialCharacter="'"){
    let startEnd = []
    let index = cadena.indexOf(specialCharacter);
    if (index != -1) startEnd.push(index);
    index = cadena.indexOf(specialCharacter, index +1)
    if (index != -1) startEnd.push(index);
    return startEnd;
}


function buildNewString(inputString, substringIndexes){
    let newString = inputString;
    let rightString = inputString.substring(substringIndexes[1]+1);
    let leftString = " ";
    if (substringIndexes[0]!=0) leftString += inputString.substring(0, substringIndexes[0]);
    newString = leftString.concat(rightString);
    return newString;
}

function extractSpecialString(inputString, substringIndexes){
    return inputString.substring(substringIndexes[0]+1, substringIndexes[1]);
}
