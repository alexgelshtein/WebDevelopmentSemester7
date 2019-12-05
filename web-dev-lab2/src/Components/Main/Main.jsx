import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import GeoCityState from '../GeoCityState/GeoCityState'
import SavedCity from '../SavedCity/SavedCity'
import { StorageRemove } from './../../Utils/CustomReducer'
import './Main.scss'

export const Main = () => {
    const [coordinates, updateCoordinates] = React.useState();
    const [loading, isLoading] = React.useState(false);
    const cities = useSelector(state => state.cities);
    const dispatch = useDispatch();

    const onRemoveCommand = (city) => {
        StorageRemove(dispatch, city);
    };

    const commandSearch = () => {
        isLoading(true);
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateCoordinates({ lat: latitude, lon: longitude });
            isLoading(false);
        });
    }

    return (
        <main className={'main'}>
            <div className="main-search">
                <h3>Weather here</h3>
                <button className={'main-search-button'} onClick={commandSearch}>Update</button>
            </div>
            <GeoCityState coordinates={coordinates} main />
            <div>
                <SavedCity />
                {
                    cities && cities.map(city => <GeoCityState key={city} city={city} onRemove={onRemoveCommand} />)
                }
            </div>
        </main >
    )
};