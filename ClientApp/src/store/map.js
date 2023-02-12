import { createSlice } from '@reduxjs/toolkit'

//se va tine toate informatiile despre harta-coordonatele si adresa
const slice = createSlice({
    name: 'map',
    initialState: {
        map: {
            latitude: 44.43225,
            longitude: 26.10626,
            address: '',
            turn:true //true-nu s-a dat clic pe harta pt adresa false-s-a dat clic pe harta pt adresa
        },
    },
    reducers: {
        _coordinatesChange: (state, action) => {
            state.map.latitude = action.payload.lat;
            state.map.longitude = action.payload.lng;
        },
        _addressChange:(state,action)=> {
            state.map.address = action.payload;
        },
        _addressGetFromField:(state)=>{
            state.map.turn=true
        },
        _addressGetFromMap:(state)=>{
            state.map.turn=false
        }
    },
});
export default slice.reducer

const { _coordinatesChange,_addressChange,_addressGetFromField,_addressGetFromMap } = slice.actions
export const coordinatesChange = (coords) => async dispatch => {
    try {
        dispatch(_coordinatesChange(coords));
    } catch (e) {
        return console.error(e.message);
    }
}

export const addressChange = (value) => async dispatch => {
    try {
        dispatch(_addressChange(value))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const addressGetFromField = (value) => async dispatch => {
    try {
        dispatch(_addressGetFromField())
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const addressGetFromMap = (value) => async dispatch => {
    try {
        dispatch(_addressGetFromMap())
    }
    catch (e) {
        return console.error(e.message);
    }
}