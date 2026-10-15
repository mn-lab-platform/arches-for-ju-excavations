import crsService from '../../../services/crs-service';

export const searchDefinitionsByQuery = (query) => {
    return crsService.searchDefinitionsByQuery(query);
}

export const transformCoordinates = (sourceCRS, targetCRS, coordinates) => {
    return crsService.transformCoordinates(sourceCRS, targetCRS, coordinates);
}