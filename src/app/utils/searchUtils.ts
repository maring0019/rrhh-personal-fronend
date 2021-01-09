/**
 * Prepare agente common search params based on inputString provided
 * by user, and then merge them with previous params
 * @param params previous params
 * @param inputString 
 */
export function getAgenteSearchParams(params, inputString){
    if (inputString && inputString.length >= 3){
        const exps = inputString.split(" ");
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