import * as React from 'react';
import { useDispatch } from "react-redux";
import { StorageAdd } from './../../Utils/CustomReducer'

import './SavedCity.scss'

export const SavedCity = () => {
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        StorageAdd(dispatch, value);
    };

    return (
        <div className={'saved'}>
            <div className={'saved-container'}>
                <h3>Favourite</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className={'saved-input'}
                        type="text"
                        placeholder={'Add a new city'}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className={'saved-button'} type={"submit"}>Add</button>
                </form>
            </div>
        </div>
    )
}
export default SavedCity;