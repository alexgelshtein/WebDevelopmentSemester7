export const actions = {
    AddCityCommand: 'AddCity',
    removeCityCommand: 'RemoveCity',
};

export const StorageAdd = (dispatch, city) => {
    dispatch({
        type: actions.AddCityCommand,
        payload: city
    })
};

export const StorageRemove = (dispatch, city) => {
    dispatch({
        type: actions.removeCityCommand,
        payload: city
    })
};

export const GetAllCities = () => {
    var localData = window.localStorage.getItem('cities');
    if (localData)
        return localData.split(',');
    return [];
}

export const AddCity = (city) => {
    const cities = GetAllCities();
    if (!cities.find(c => c === city))
        cities.push(city);

    window.localStorage.setItem('cities', cities);
    return cities;
}
export const RemoveCity = (city) => {
    const cities = GetAllCities().filter(c => c && c !== city);
    window.localStorage.setItem('cities', cities);
    return cities;
}

export function reducer(state = { cities: GetAllCities() }, action) {
    var cityName = action.payload;
    console.info(`${action.type} payload: ${cityName}`);

    switch (action.type) {
        case actions.AddCityCommand:
            return {
                cities: AddCity(cityName)
            }

        case actions.removeCityCommand:
            return {
                cities: RemoveCity(cityName)
            }

        default:
            return state;
    }
};
