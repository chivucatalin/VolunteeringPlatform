import dayjs from "dayjs";
import { createSlice } from '@reduxjs/toolkit'

//unde tinem toate filtrele global
const slice = createSlice({
    name: 'filter',
    initialState: {
        filter: {
            name:"",
            address:"",
            fromDate:dayjs().format('MM-DD-YYYY'),
            toDate:dayjs().add(30,'days').format('MM-DD-YYYY'),
            searchQuery:"",
        },
    },
    reducers: {
        filterParamsChange: (state,action)=>{
            state.filter.name = action.payload.name;
            state.filter.address = action.payload.address;
            state.filter.fromDate = action.payload.fromDate;
            state.filter.toDate = action.payload.toDate;
            state.filter.searchQuery=action.payload.searchQuery;
            if(action.payload.eventType || action.payload.eventType===0) state.filter.eventType=action.payload.eventType;
            else delete state.filter.eventType;
        }
    },
});
export default slice.reducer

const { filterParamsChange } = slice.actions
export const filterChange = (filterParams) => async dispatch => {
    try {
        dispatch(filterParamsChange(filterParams));
    } catch (e) {
        return console.error(e.message);
    }
}